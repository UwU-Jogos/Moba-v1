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

import { Shape } from './_';
import { V2 } from '../V2/_';

export function match<T>(
  shape: Shape,
  handlers: {
    line: (ini: V2, end: V2) => T,
    circle: (pos: V2, rad: number) => T,
    square: (pos: V2, side: number) => T,
    triangle: (v1: V2, v2: V2, v3: V2) => T,
    rectangle: (pos: V2, width: number, height: number) => T
  }
): T {
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
