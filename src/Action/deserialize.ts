import { Action } from './_';
import { match } from './match';

export function deserialize(data: Uint8Array): Action {
  const decoder = new TextDecoder();
  switch (data[0]) {
    case 0: { // SetNick
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const name = decoder.decode(data.slice(13));
      return { $: "SetNick", time, pid, name };
    }
    case 1: { // KeyEvent
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const key = String.fromCharCode(data[13]);
      const down = data[14] === 1;
      const mouse_pos_x = new Uint32Array(data.slice(15, 19).buffer)[0];
      const mouse_pos_y = new Uint32Array(data.slice(19, 23).buffer)[0];
      return { $: "KeyEvent", time, pid, key, down, mouse_pos: { x: mouse_pos_x, y: mouse_pos_y } };
    }
    case 2: { // Mouse event
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const x = (data[13] << 8) | data[14];
      const y = (data[15] << 8) | data[16];
      return { $: "MouseClick", time, pid, x, y };
    }
    default: {
      throw new Error("Unknown action type");
    }
  }
}
