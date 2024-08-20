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

import { Shape } from './_';
import { V2 } from '../V2/_';

export function rectangle(pos: V2, width: number, height: number): Shape {
  return {
    type: 'rectangle',
    pos,
    width,
    height
  };
}
