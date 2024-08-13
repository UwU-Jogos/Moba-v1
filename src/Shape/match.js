"use strict";
/// Matches a Shape with corresponding handler functions.
///
/// # Input
///
/// * `shape` - The Shape to match against
/// * `handlers` - An object containing handler functions for each shape type
///
/// # Output
///
/// The result of calling the appropriate handler function for the given shape
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
function match(shape, handlers) {
    switch (shape.type) {
        case 'line':
            return handlers.line(shape.ini, shape.end);
        case 'circle':
            return handlers.circle(shape.pos, shape.rad);
        case 'square':
            return handlers.square(shape.pos, shape.side);
        case 'triangle':
            return handlers.triangle(shape.v1, shape.v2, shape.v3);
        case 'rectangle':
            return handlers.rectangle(shape.pos, shape.width, shape.height);
    }
}
exports.match = match;
