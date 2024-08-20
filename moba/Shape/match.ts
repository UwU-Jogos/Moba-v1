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
import { V2 } from '../../base/V2/_';

export function match<T>(
  shape: Shape,
  handlers: {
    line: (ini: V2, end: V2) => T,
    circle: (pos: V2, rad: number) => T,
    square: (pos: V2, side: number) => T,
    triangle: (v1: V2, v2: V2, v3: V2) => T,
    rectangle: (pos: V2, width: number, height: number) => T,
    diamond: (pos: V2, width: number, height: number) => T,
    pentagon: (pos: V2, radius: number) => T,
    star: (pos: V2, outer_radius: number, inner_radius: number) => T
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
    case 'diamond':
      return handlers.diamond(shape.pos, shape.width, shape.height);
    case 'pentagon':
      return handlers.pentagon(shape.pos, shape.radius);
    case 'star':
      return handlers.star(shape.pos, shape.outer_radius, shape.inner_radius);
  }
}
