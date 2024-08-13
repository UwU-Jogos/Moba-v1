"use strict";
/// Creates a circle shape.
///
/// # Input
///
/// * `pos` - The center point of the circle (V2)
/// * `rad` - The radius of the circle (number)
///
/// # Output
///
/// A Shape representing a circle with the given center position and radius
Object.defineProperty(exports, "__esModule", { value: true });
exports.circle = void 0;
function circle(pos, rad) {
    return {
        type: 'circle',
        pos: pos,
        rad: rad
    };
}
exports.circle = circle;
