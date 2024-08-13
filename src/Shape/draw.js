"use strict";
/// Draws a Shape on the canvas.
///
/// # Input
///
/// * `canvas` - The canvas rendering context
/// * `shape` - The Shape to draw
/// * `color` - The color to fill the shape with
///
/// # Output
///
/// This function doesn't return a value, but draws the shape on the canvas
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = void 0;
var match_1 = require("./match");
function draw(canvas, shape, color) {
    canvas.fillStyle = color;
    (0, match_1.match)(shape, {
        line: function (ini, end) {
            canvas.beginPath();
            canvas.moveTo(ini.x, ini.y);
            canvas.lineTo(end.x, end.y);
            canvas.stroke();
        },
        circle: function (pos, rad) {
            canvas.beginPath();
            canvas.arc(pos.x, pos.y, rad, 0, 2 * Math.PI);
            canvas.fill();
        },
        square: function (pos, side) {
            canvas.fillRect(pos.x, pos.y, side, side);
        },
        triangle: function (v1, v2, v3) {
            canvas.beginPath();
            canvas.moveTo(v1.x, v1.y);
            canvas.lineTo(v2.x, v2.y);
            canvas.lineTo(v3.x, v3.y);
            canvas.closePath();
            canvas.fill();
        },
        rectangle: function (pos, width, height) {
            canvas.fillRect(pos.x, pos.y, width, height);
        }
    });
}
exports.draw = draw;
