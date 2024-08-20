/// Creates a circle shape.
///
/// # Input
///
/// * `pos` - The center point of the circle (V2)
/// * `rad` - The radius of the circle (number)
///
/// # Output
///
/// A Shape representing a circle with the given center position and radius

import { Shape } from './_';
import { V2 } from '../../base/V2/_';

export function circle(pos: V2, rad: number): Shape {
  return {
    type: 'circle',
    pos,
    rad
  };
}
