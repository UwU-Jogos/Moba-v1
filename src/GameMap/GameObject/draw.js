"use strict";
/// Draws a GameObject based on its type.
///
/// # Input
///
/// * `ctx` - The rendering context
/// * `gameObject` - The GameObject to be drawn
///
/// # Output
///
/// Renders the GameObject on the canvas
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = void 0;
var match_1 = require("./match");
var rectangle_1 = require("../../Shape/rectangle");
var line_1 = require("../../Shape/line");
var draw_1 = require("../../Shape/draw");
var consts_1 = require("../../Helpers/consts");
function draw(ctx, gameObject) {
    (0, match_1.match)(gameObject, {
        Platform: function (position, width, height) {
            var rectangle_shape = (0, rectangle_1.rectangle)(position, width, height);
            (0, draw_1.draw)(ctx, rectangle_shape, consts_1.PLATFORM_COLOR);
        },
        Wall: function (position, width, height) {
            var line_shape = (0, line_1.line)(position, { x: position.x + width, y: position.y + height });
            (0, draw_1.draw)(ctx, line_shape, consts_1.WALL_COLOR);
        },
    });
}
exports.draw = draw;
