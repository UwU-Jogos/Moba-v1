import { $KEYEVENT, $MOUSECLICK, $KEYMOUSE, $MOUSEMOVE, $SETNICK } from './ex.js';

function serialize(event_obj) {
  switch (event_obj.$) {
    case "KeyEvent": return serialize_key_event(event_obj);
    case "KeyMouse": return serialize_key_mouse(event_obj);
    case "MouseClick": return serialize_mouse_click(event_obj);
    case "MouseMove": return serialize_mouse_move(event_obj);
    case "ActionEvent": return serialize_action_event(event_obj);
  }
}

function serialize_bool(value) {
  const byte_value = value ? 1 : 0
  return new Uint8Array([byte_value]);
}

function serialize_float64(value) {
  const buffer = new Float64Array(1);
  buffer[0] = value;
  return new Uint8Array(buffer.buffer);
}

function serialize_key_event(event_obj) {
  if (event_obj.$ != "KeyEvent") {
    return new Uint8Array();
  }
  const buffer = [];
  let time = event_obj.time
  let pid = event_obj.pid
  let pressed = (event_obj.pressed.$) == "False" ? 0 : 1  
  let key = event_obj.key.head

  buffer.push(Number($KEYEVENT));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 8));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 8));
  buffer.push(Number(key));
  buffer.push(Number(pressed));
  return new Uint8Array(buffer);
}

function serialize_click(click_obj) {
  let byte_value =  (click_obj.$ == "LeftButton") ? 0 : 1
  return new Uint8Array([byte_value]);
}

function serialize_mouse_click(event_obj) {
  if (event_obj.$ != "MouseClick") {
    return new Uint8Array();
  }
  const buffer = [];
  let time = event_obj.time
  let pid = event_obj.pid
  let serialized_click = serialize_click(event_obj.click);
  let x = event_obj.x
  let y = event_obj.y

  buffer.push(Number($MOUSECLICK));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 8));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 8));
  buffer.push(Number(serialized_click));
  buffer.push(...serialize_float64(x));
  buffer.push(...serialize_float64(y));
  return new Uint8Array(buffer);
}

function serialize_key_mouse(event_obj) {
  if (event_obj.$ != "KeyMouse") {
    return new Uint8Array();
  }
  const buffer = [];
  let time = event_obj.time
  let pid = event_obj.pid
  let key = event_obj.key.head
  let pressed = (event_obj.pressed.$) == "False" ? 0 : 1  
  let x = event_obj.x
  let y = event_obj.y

  buffer.push(Number($KEYMOUSE));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 8));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 8));
  buffer.push(Number(key));
  buffer.push(pressed);
  buffer.push(...serialize_float64(x));
  buffer.push(...serialize_float64(y));
  return new Uint8Array(buffer);
}

function serialize_mouse_move(event_obj) {
  if (event_obj.$ != "MouseMove") {
    return new Uint8Array();
  }
  const buffer = [];
  let time = event_obj.time
  let pid = event_obj.pid
  let x = event_obj.x
  let y = event_obj.y

  buffer.push(Number($MOUSEMOVE));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 8));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 8));
  buffer.push(...serialize_float64(x));
  buffer.push(...serialize_float64(y));
  return new Uint8Array(buffer);
}

function serialize_string(list) {
  const bytes = [];

  function traverse(node) {
    if (node.$ === "Nil") {
      return;
    }
    if (node.$ === "Cons") {
      bytes.push(Number(node.head)); 
      traverse(node.tail); 
    }
  }

  traverse(list);
  return new Uint8Array(bytes);
}

function serialize_set_nick(action_obj) {
  const buffer = [];
  let time = action_obj.time
  let pid = action_obj.pid
  let serialized_string = serialize_string(action_obj.nick);
  buffer.push(Number($SETNICK));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 8));
  buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 8));
  buffer.push(...serialized_string);
  return new Uint8Array(buffer);
}

function serialize_action(action_obj) {
  switch (action_obj.$) {
    case "SetNick": return serialize_set_nick(action_obj);
    default: return new Uint8Array();
  }
}

function serialize_action_event(event_obj) {
    if (event_obj.$ != "ActionEvent") {
      return new Uint8Array();
    }
    return serialize_action(event_obj.action);
}

export { serialize };
