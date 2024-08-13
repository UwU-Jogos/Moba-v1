"use strict";
/// Creates a square shape.
///
/// # Input
///
/// * `pos` - The top-left corner of the square (V2)
/// * `side` - The length of a side of the square (number)
///
/// # Output
///
/// A Shape representing a square with the given top-left corner and side length
Object.defineProperty(exports, "__esModule", { value: true });
exports.square = void 0;
function square(pos, side) {
    return {
        type: 'square',
        pos: pos,
        side: side
    };
}
exports.square = square;
