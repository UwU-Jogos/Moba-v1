"use strict";
/// Returns the dimensions of the canvas element.
///
/// # Exports
///
/// * `get_canvas_dimensions` - Function that retrieves the width and height of the canvas
///
/// # Returns
///
/// * An object with `width` and `height` properties representing the canvas dimensions
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_canvas_dimensions = void 0;
function get_canvas_dimensions() {
    var canvas = document.getElementById("canvas");
    return { width: canvas.width, height: canvas.height };
}
exports.get_canvas_dimensions = get_canvas_dimensions;
