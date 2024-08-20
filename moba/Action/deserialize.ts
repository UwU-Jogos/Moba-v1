/// Deserializes a Uint8Array into an Action.
///
/// # Description
///
/// This function takes a serialized Uint8Array and converts it back into an Action object.
///
/// # Input
///
/// * `data` - A Uint8Array containing the serialized Action data
///
/// # Output
///
/// Returns an Action object deserialized from the input data
///
/// # Throws
///
/// Throws an Error if an unknown action type is encountered

import { Action } from './_';

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
      const character = data[13];
      const name = decoder.decode(data.slice(14));
      return { $: "SetNick", time, pid, name, character };
    }
    case 1: { // SkillEvent
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const key = String.fromCharCode(data[13]);
      const down = data[14] === 1;
      const x = (data[15] << 8) | data[16];
      const y = (data[17] << 8) | data[18];
      return { $: "SkillEvent", time, pid, key, down, x, y };
    }
    case 2: { // MouseClick
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
    case 3: { // MovementEvent
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const key = String.fromCharCode(data[13]);
      const down = data[14] === 1;
      return { $: "MovementEvent", time, pid, key, down };
    }
    default: {
      throw new Error("Unknown action type");
    }
  }
}