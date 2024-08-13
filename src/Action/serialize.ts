/// Serializes an Action into a Uint8Array.
///
/// # Description
///
/// This function takes an Action object and converts it into a serialized Uint8Array.
///
/// # Input
///
/// * `action` - An Action object to be serialized
///
/// # Output
///
/// Returns a Uint8Array containing the serialized Action data

import { Action } from './_';
import { match } from './match';

export function serialize(action: Action): Uint8Array {
  const encoder = new TextEncoder();

  return match(action, {
    SetNick: (time: number, pid: number, name: string, character: number) => {
      const buffer: number[] = [];
      buffer.push(0); // Action type identifier for SetNick
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
      buffer.push(character); // 1-byte character type
      buffer.push(...encoder.encode(name));
      return new Uint8Array(buffer);
    },

    SkillEvent: (time: number, pid: number, key: string, down: boolean, x: number, y: number) => {
      const buffer: number[] = [];
      buffer.push(1); // Action type identifier for SkillEvent
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
      buffer.push(key.charCodeAt(0)); // 8-bit Key
      buffer.push(down ? 1 : 0); // Boolean as 1 or 0
      // x and y are represented using 2 bytes each
      buffer.push((x >> 8) & 0xFF);  // High byte
      buffer.push(x & 0xFF);         // Low byte
      buffer.push((y >> 8) & 0xFF);  // High byte
      buffer.push(y & 0xFF);         // Low byte
      return new Uint8Array(buffer);
    },

    MouseClick: (time: number, pid: number, x: number, y: number) => {
      const buffer: number[] = [];
      buffer.push(2); // Action type identifier for MouseClick
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
      buffer.push((x >> 8) & 0xFF);  // High byte
      buffer.push(x & 0xFF);         // Low byte
      buffer.push((y >> 8) & 0xFF);  // High byte
      buffer.push(y & 0xFF);         // Low byte
      return new Uint8Array(buffer);
    },

    MovementEvent: (time: number, pid: number, key: string, down: boolean) => {
      const buffer: number[] = [];
      buffer.push(3); // Action type identifier for KeyEvent
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
      buffer.push(key.charCodeAt(0)); // 8-bit Key
      buffer.push(down ? 1 : 0); // Boolean as 1 or 0
      return new Uint8Array(buffer);
    }
  });
}
