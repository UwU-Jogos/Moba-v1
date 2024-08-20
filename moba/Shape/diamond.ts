/// Creates a diamond shape.
///
/// # Input
///
/// * `pos` - The center point of the diamond (V2)
/// * `width` - The width of the diamond (number)
/// * `height` - The height of the diamond (number)
///
/// # Output
///
/// A Shape representing a diamond with the given center position, width, and height

import { Shape } from './_';
import { V2 } from '../../base/V2/_';

export function diamond(pos: V2, width: number, height: number): Shape {
  return {
    type: 'diamond',
    pos,
    width,
    height
  };
}
