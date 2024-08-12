/// Creates a pentagon shape.
///
/// # Input
///
/// * `pos` - The top-left corner of the rectangle (V2)
/// * `radius` - The radius of the inner pentagon 
///
/// # Output
///
/// A Shape representing a pentagon with the given top-left corner, width, and height

import { Shape } from './_';
import { V2 } from '../V2/_';

export function pentagon(pos: V2, radius: number): Shape {
  return {
    type: 'pentagon',
    pos: pos,
    radius: radius
  };
}
