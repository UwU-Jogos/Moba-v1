

function encodeKey(keyEv: { key: number, event: number }): Uint8Array {
  if (keyEv.key > 127) {
    throw new Error("Invalid key code. Must be 7 bits or less.");
  }
  const mergedByte = (keyEv.key << 1) | keyEv.event;
  return new Uint8Array([mergedByte]);
}

function decodeKey(encodedKey: Uint8Array): { key: number, event: number } {
  if (encodedKey.length !== 1) {
    throw new Error("Invalid encoded key length.");
  }

  const mergedByte = encodedKey[0];
  return {
    key: mergedByte >> 1,
    event: mergedByte & 1
  };
}

function encode(message: {
  tag: 0;
  user: number;
  time: number;
  key: Uint8Array;
} | {
  tag: 1;
  user: number;
  name: string;
} 
// | {
//   tag: 2;
//   state: any; 
// }
): Uint8Array {
  // if (message.tag === 2) {
  //   // Encode any state as JSON
  //   const json = JSON.stringify(message.state);
  //   const encoder = new TextEncoder();
  //   const jsonBytes = encoder.encode(json);
  //   const length = jsonBytes.length;

  //   const result = new Uint8Array(5 + length);
  //   result[0] = message.tag;
  //   const view = new DataView(result.buffer);
  //   view.setUint32(1, length, true); // Length of JSON string
  //   result.set(jsonBytes, 5); // JSON string
  //   return result;
  // }

  const result = new Uint8Array(12);
  const view = new DataView(result.buffer);

  // Set tag
  result[0] = message.tag;

  // Set user (u32)
  view.setUint32(1, message.user, true);

  if (message.tag === 0) {
    // Set time (u48)
    view.setUint32(5, message.time & 0xFFFFFFFF, true);
    view.setUint16(9, (message.time >> 32) & 0xFFFF, true);

    // Set key (u8)
    result[11] = message.key[0];
  } else if (message.tag === 1) {
    // Set name (7 bytes)
    const encoder = new TextEncoder();
    const nameBytes = encoder.encode(message.name);
    const nameBytesToCopy = Math.min(nameBytes.length, 7);
    result.set(nameBytes.subarray(0, nameBytesToCopy), 5);

    // If name is shorter than 7 bytes, pad with zeros
    if (nameBytesToCopy < 7) {
      result.fill(0, 5 + nameBytesToCopy, 12);
    }
  }

  return result;
}

function decode(encoded: Uint8Array): {
  tag: 0;
  user: number;
  time: number;
  key: Uint8Array;
} | {
  tag: 1;
  user: number;
  name: string;
}
//  | {
//   tag: 2;
//   state: any; // Tipo genérico para o estado
// } 
{
  const view = new DataView(encoded.buffer);
  const tag = encoded[0];

  // if (tag === 2) {
  //   // Decode any state from JSON
  //   const length = view.getUint32(1, true);
  //   const jsonBytes = encoded.slice(5, 5 + length);
  //   const json = new TextDecoder().decode(jsonBytes);
  //   const state = JSON.parse(json);
  //   return { tag, state };
  // }

  if (encoded.length !== 12) {
    throw new Error("Invalid encoded message length. Expected 12 bytes.");
  }

  const user = view.getUint32(1, true);

  if (tag === 0) {
    const timeLow = view.getUint32(5, true);
    const timeHigh = view.getUint16(9, true);
    const time = (timeHigh << 32) | timeLow;
    const key = encoded.slice(11, 12);

    return {
      tag: 0,
      user,
      time: time,
      key
    };
  } else if (tag === 1) {
    const nameBytes = encoded.slice(5, 12);
    const nullTerminatorIndex = nameBytes.indexOf(0);
    const nameLength = nullTerminatorIndex === -1 ? 7 : nullTerminatorIndex;
    const decoder = new TextDecoder();
    const name = decoder.decode(nameBytes.subarray(0, nameLength));

    return {
      tag: 1,
      user,
      name
    };
  } else {
    throw new Error("Invalid message tag");
  }
  }

function hex_to_bytes(hex: string): Uint8Array {
  const arr = []
  for (let i = 0; i < hex.length / 2; ++i) {
    arr.push((parseInt(hex[i * 2 + 0], 16) << 4) | parseInt(hex[i * 2 + 1], 16))
  }
  return new Uint8Array(arr)
}

const hex_char = "0123456789abcdef".split("")
function bytes_to_hex(buf: Uint8Array): string {
  let hex = ""
  for (let i = 0; i < buf.length; ++i) {
    hex += hex_char[buf[i] >>> 4] + hex_char[buf[i] & 0xf]
  }
  return hex
}

function hex_join(arr: string[]): string {
  let res = ""
  for (let i = 0; i < arr.length; ++i) {
    res += arr[i]
  }
  return res
}

function hexs_to_bytes(arr: string[]): Uint8Array {
  return hex_to_bytes(hex_join(arr))
}

function u8_to_hex(num: number): string {
  return ("00" + num.toString(16)).slice(-2)
}

function hex_to_u8(hex: string): number {
  return parseInt(hex, 16)
}

function hex_to_u32(hex: string): number {
  return parseInt(hex.slice(-32), 16)
}

function hex_to_u64(hex: string): number {
  return parseInt(hex.slice(-64), 16)
}

function uN_to_hex(N: number, num: number): string {
  let hex = ""
  for (let i = 0; i < N / 4; ++i) {
    hex += hex_char[(num / (2 ** ((N / 4 - i - 1) * 4))) & 0xf]
  }
  return hex
}

function u32_to_hex(num: number): string {
  return uN_to_hex(32, num)
}

function u64_to_hex(num: number): string {
  return uN_to_hex(64, num)
}

function check_hex(bits: number | null, hex: string): string | null {
  if (typeof hex !== "string") {
    return null
  }
  if (!/^[a-fA-F0-9]*$/.test(hex)) {
    return null
  }
  if (bits) {
    while (hex.length * 4 < bits) {
      hex = "0" + hex
    }
    if (hex.length * 4 > bits) {
      hex = hex.slice(0, Math.floor(bits / 4))
    }
    return hex.toLowerCase()
  } else {
    hex = hex.length % 2 === 1 ? "0" + hex : hex
    return hex.toLowerCase()
  }
}

function string_to_hex(str: string): string {
  return bytes_to_hex(string_to_bytes(str))
}

function hex_to_string(hex: string): string {
  return bytes_to_string(hex_to_bytes(hex))
}

function states_new(): null {
  return null
}
function string_to_bytes(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function bytes_to_string(bytes: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

function json_to_hex(json: Record<string, any>): string {
  const jsonString = JSON.stringify(json);
  const bytes = string_to_bytes(jsonString);
  return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function hex_to_json(hex: string): Record<string, any> {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const jsonString = bytes_to_string(bytes);
  return JSON.parse(jsonString);
}

function states_push(states: null | { bit: number; current: any; older: null | any }, new_state: any): { bit: number; current: any; older: null | any } {
  if (states === null) {
    return { bit: 0, current: new_state, older: null }
  } else {
    const { bit, current, older } = states
    if (bit === 0) {
      return { bit: 1, current, older }
    } else {
      return { bit: 0, current: new_state, older: states_push(older, current) }
    }
  }
}

function states_before(states: null | { bit: number; current: { tick: number }; older: null | any }, tick: number): null | any {
  if (states === null) {
    return null
  } else {
    if (states.current.tick < tick) {
      return states.current
    } else {
      return states_before(states.older, tick)
    }
  }
}

export default {
  encodeKey,
  decodeKey,
  encode,
  decode,
  hex_to_bytes,
  bytes_to_hex,
  hexs_to_bytes,
  hex_join,
  u8_to_hex,
  hex_to_u8,
  u32_to_hex,
  hex_to_u32,
  u64_to_hex,
  hex_to_u64,
  string_to_hex,
  hex_to_string,
  check_hex,
  json_to_hex,
  hex_to_json,
  states_new,
  states_push,
  states_before,
}
