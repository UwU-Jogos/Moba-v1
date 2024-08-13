"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
var match_1 = require("./match");
function serialize(action) {
    var encoder = new TextEncoder();
    return (0, match_1.match)(action, {
        SetNick: function (time, pid, name) {
            var buffer = [];
            buffer.push(0); // Action type identifier for SetNick
            buffer.push.apply(// Action type identifier for SetNick
            buffer, new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
            buffer.push.apply(// 48-bit Time
            buffer, new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
            buffer.push.apply(// 48-bit UID
            buffer, encoder.encode(name));
            return new Uint8Array(buffer);
        },
        SkillEvent: function (time, pid, key, down, x, y) {
            var buffer = [];
            buffer.push(1); // Action type identifier for SkillEvent
            buffer.push.apply(// Action type identifier for SkillEvent
            buffer, new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
            buffer.push.apply(// 48-bit Time
            buffer, new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
            buffer.push(key.charCodeAt(0)); // 8-bit Key
            buffer.push(down ? 1 : 0); // Boolean as 1 or 0
            // x and y are represented using 2 bytes each
            buffer.push((x >> 8) & 0xFF); // High byte
            buffer.push(x & 0xFF); // Low byte
            buffer.push((y >> 8) & 0xFF); // High byte
            buffer.push(y & 0xFF); // Low byte
            return new Uint8Array(buffer);
        },
        MouseClick: function (time, pid, x, y) {
            var buffer = [];
            buffer.push(2); // Action type identifier for MouseClick
            buffer.push.apply(// Action type identifier for MouseClick
            buffer, new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)); // 48-bit Time
            buffer.push.apply(// 48-bit Time
            buffer, new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)); // 48-bit UID
            buffer.push((x >> 8) & 0xFF); // High byte
            buffer.push(x & 0xFF); // Low byte
            buffer.push((y >> 8) & 0xFF); // High byte
            buffer.push(y & 0xFF); // Low byte
            return new Uint8Array(buffer);
        }
    });
}
exports.serialize = serialize;
