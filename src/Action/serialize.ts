import { Action } from './_';
import { match } from './match';

export function serialize(action: Action): Uint8Array {
  const encoder = new TextEncoder();

  return match(action, {
    SetNick: (time: number, pid: number, name: string) => {
      let buffer: number[] = [];
      buffer.push(0); // Action type identifier for SetNick
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
      buffer.push(...encoder.encode(name));
      return new Uint8Array(buffer);
    },

    KeyEvent: (time: number, pid: number, key: string, down: boolean) => {
      let buffer: number[] = [];
      buffer.push(1); // Action type identifier for KeyEvent
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
      buffer.push(...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
      buffer.push(key.charCodeAt(0)); // 8-bit Key
      buffer.push(down ? 1 : 0); // Boolean as 1 or 0
      return new Uint8Array(buffer);
    }
  });
}
