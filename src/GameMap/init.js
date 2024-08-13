"use strict";
/// Initializes a game map with simple GameObjects.
///
/// # Input
///
/// This function takes no parameters.
///
/// # Output
///
/// Returns a GameMap with predefined dimensions and a set of GameObjects.
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var get_canvas_dimensions_1 = require("../Helpers/get_canvas_dimensions");
function init() {
    var _a = (0, get_canvas_dimensions_1.get_canvas_dimensions)(), width = _a.width, height = _a.height;
    var objects = [
        { kind: 'Wall', position: { x: 100, y: 200 }, width: width - 400, height: 10 },
        { kind: 'Platform', position: { x: 100, y: height - 100 }, width: 100, height: 20 },
    ];
    return {
        width: width,
        height: height,
        objects: objects
    };
}
exports.init = init;
