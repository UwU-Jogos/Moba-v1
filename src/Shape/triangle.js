"use strict";
/// Creates a triangle shape.
///
/// # Input
///
/// * `v1` - The first vertex of the triangle (V2)
/// * `v2` - The second vertex of the triangle (V2)
/// * `v3` - The third vertex of the triangle (V2)
///
/// # Output
///
/// A Shape representing a triangle
Object.defineProperty(exports, "__esModule", { value: true });
exports.triangle = void 0;
function triangle(v1, v2, v3) {
    return {
        type: 'triangle',
        v1: v1,
        v2: v2,
        v3: v3
    };
}
exports.triangle = triangle;
