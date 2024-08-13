/// Creates a square shape.
///
/// # Input
///
/// * `pos` - The top-left corner of the square (V2)
/// * `side` - The length of a side of the square (number)
///
/// # Output
///
/// A Shape representing a square with the given top-left corner and side length

import { Shape } from './_';
import { V2 } from '../V2/_';

export function square(pos: V2, side: number): Shape {
  return {
    type: 'square',
    pos,
    side
  };
}
