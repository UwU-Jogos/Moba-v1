"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = void 0;
function deserialize(data) {
    var decoder = new TextDecoder();
    switch (data[0]) {
        case 0: { // SetNick
            var tick_buffer = new Uint8Array(8);
            tick_buffer.set(data.slice(1, 7), 0);
            var time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
            var pid_buffer = new Uint8Array(8);
            pid_buffer.set(data.slice(7, 13), 0);
            var pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
            var name_1 = decoder.decode(data.slice(13));
            return { $: "SetNick", time: time, pid: pid, name: name_1 };
        }
        case 1: { // SkillEvent
            var tick_buffer = new Uint8Array(8);
            tick_buffer.set(data.slice(1, 7), 0);
            var time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
            var pid_buffer = new Uint8Array(8);
            pid_buffer.set(data.slice(7, 13), 0);
            var pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
            var key = String.fromCharCode(data[13]);
            var down = data[14] === 1;
            var x = (data[15] << 8) | data[16];
            var y = (data[17] << 8) | data[18];
            return { $: "SkillEvent", time: time, pid: pid, key: key, down: down, x: x, y: y };
        }
        case 2: { // MouseClick
            var tick_buffer = new Uint8Array(8);
            tick_buffer.set(data.slice(1, 7), 0);
            var time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
            var pid_buffer = new Uint8Array(8);
            pid_buffer.set(data.slice(7, 13), 0);
            var pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
            var x = (data[13] << 8) | data[14];
            var y = (data[15] << 8) | data[16];
            return { $: "MouseClick", time: time, pid: pid, x: x, y: y };
        }
        default: {
            throw new Error("Unknown action type");
        }
    }
}
exports.deserialize = deserialize;
