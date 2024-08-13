"use strict";
/// Creates a Line shape.
///
/// # Input
///
/// * `ini` - The initial point of the line (V2)
/// * `end` - The end point of the line (V2)
///
/// # Output
///
/// A Shape representing a line from ini to end
Object.defineProperty(exports, "__esModule", { value: true });
exports.line = void 0;
function line(ini, end) {
    return {
        type: 'line',
        ini: ini,
        end: end
    };
}
exports.line = line;
