import { $KEYEVENT, $MOUSECLICK, $KEYMOUSE, $MOUSEMOVE, $SETNICK } from './ex.js';

function deserialize(buffer, offset = 0) {
  if (buffer.length === 0) {
    return {value: null, bytesRead: 0};
  }

  switch (buffer[offset]) {
    case Number($KEYEVENT):
      return deserialize_key_event(buffer, offset);
    case Number($MOUSECLICK):
      return deserialize_mouse_click(buffer, offset);
    case Number($KEYMOUSE):
      return deserialize_key_mouse(buffer, offset);
    case Number($MOUSEMOVE):
      return deserialize_mouse_move(buffer, offset);
    case Number($SETNICK):
      return deserialize_action_event(buffer, offset);
    default:
      return {value: null, bytesRead: 0};
  }
}

function deserialize_bool(buffer, offset = 0) {
  return {value: buffer[offset] !== 0, bytesRead: 1};
}

function deserialize_float64(buffer, offset = 0) {
  const view = new DataView(buffer instanceof ArrayBuffer ? buffer : buffer.buffer);
  return { value: view.getFloat64(offset, true), bytesRead: 8 };
}

function deserialize_key_event(buffer, offset = 0) {
  if (buffer[offset] !== Number($KEYEVENT)) {
    return {value: null, bytesRead: 0};
  }
  offset += 1;
  const time = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const pid = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const key = buffer[offset];
  offset += 1;
  const pressed = buffer[offset] !== 0;
  offset += 1;
  return {
    value: {
      $: "KeyEvent",
      time: time,
      pid: pid,
      key: {$: "Cons", head: key, tail: {$: "Nil"}},
      pressed: pressed ? {$: "True"} : {$: "False"}
    },
    bytesRead: offset
  };
}

function deserialize_click(buffer, offset = 0) {
  const byte_value = buffer[offset];
  return {
    value: byte_value === 0 ? {$: "LeftButton"} : {$: "RightButton"},
    bytesRead: 1
  };
}

function deserialize_mouse_click(buffer, offset = 0) {
  if (buffer[offset] !== Number($MOUSECLICK)) {
    return {value: null, bytesRead: 0};
  }
  offset += 1;
  const time = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const pid = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const click = deserialize_click(buffer, offset);
  offset += click.bytesRead;
  const x = deserialize_float64(buffer, offset);
  offset += x.bytesRead;
  const y = deserialize_float64(buffer, offset);
  offset += y.bytesRead;
  return {
    value: {
      $: "MouseClick",
      time: time,
      pid: pid,
      click: click.value,
      x: x.value,
      y: y.value
    },
    bytesRead: offset
  };
}

function deserialize_key_mouse(buffer, offset = 0) {
  if (buffer[offset] !== Number($KEYMOUSE)) {
    return {value: null, bytesRead: 0};
  }
  offset += 1;
  const time = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const pid = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const key = buffer[offset];
  offset += 1;
  const pressed = buffer[offset] !== 0;
  offset += 1;
  const x = deserialize_float64(buffer, offset);
  offset += x.bytesRead;
  const y = deserialize_float64(buffer, offset);
  offset += y.bytesRead;
  return {
    value: {
      $: "KeyMouse",
      time: time,
      pid: pid,
      key: {$: "Cons", head: key, tail: {$: "Nil"}},
      pressed: pressed ? {$: "True"} : {$: "False"},
      x: x.value,
      y: y.value
    },
    bytesRead: offset
  };
}

function deserialize_mouse_move(buffer, offset = 0) {
  if (buffer[offset] !== Number($MOUSEMOVE)) {
    return {value: null, bytesRead: 0};
  }
  offset += 1;
  const time = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const pid = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const x = deserialize_float64(buffer, offset);
  offset += x.bytesRead;
  const y = deserialize_float64(buffer, offset);
  offset += y.bytesRead;
  return {
    value: {
      $: "MouseMove",
      time: time,
      pid: pid,
      x: x.value,
      y: y.value
    },
    bytesRead: offset
  };
}

function deserialize_string(buffer, offset = 0) {
  const bytes = [];
  while (offset < buffer.length) {
    bytes.push(buffer[offset]);
    offset++;
  }
  let list = {$: "Nil"};
  for (let i = bytes.length - 1; i >= 0; i--) {
    list = {$: "Cons", head: BigInt(bytes[i]), tail: list};
  }
  return {value: list, bytesRead: bytes.length};
}

function deserialize_set_nick(buffer, offset = 0) {
  if (buffer[offset] !== Number($SETNICK)) {
    return {value: null, bytesRead: 0};
  }
  offset += 1;
  const time = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const pid = BigInt(new DataView(buffer.buffer, offset).getBigUint64(0, true));
  offset += 8;
  const nick = deserialize_string(buffer, offset);
  offset += nick.bytesRead;
  return {
    value: {
      $: "SetNick",
      time: time,
      pid: pid,
      nick: nick.value
    },
    bytesRead: offset
  };
}

function deserialize_action(buffer, offset = 0) {
  if (buffer[offset] === Number($SETNICK)) {
    return deserialize_set_nick(buffer, offset);
  }
  return {value: null, bytesRead: 0};
}

function deserialize_action_event(buffer, offset = 0) {
  const action = deserialize_action(buffer, offset);
  if (action.value === null) {
    return {value: null, bytesRead: 0};
  }
  return {
    value: {
      $: "ActionEvent",
      action: action.value
    },
    bytesRead: action.bytesRead
  };
}

export { deserialize };
