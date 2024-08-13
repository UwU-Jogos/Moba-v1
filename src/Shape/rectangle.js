"use strict";
/// Creates a rectangle shape.
///
/// # Input
///
/// * `pos` - The top-left corner of the rectangle (V2)
/// * `width` - The width of the rectangle (number)
/// * `height` - The height of the rectangle (number)
///
/// # Output
///
/// A Shape representing a rectangle with the given top-left corner, width, and height
Object.defineProperty(exports, "__esModule", { value: true });
exports.rectangle = void 0;
function rectangle(pos, width, height) {
    return {
        type: 'rectangle',
        pos: pos,
        width: width,
        height: height
    };
}
exports.rectangle = rectangle;
