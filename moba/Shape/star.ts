/// Creates a pentagon shape.
///
/// # Input
///
/// * `pos` - The center point of the star (V2)
/// * `outer_radius`
/// * `inner_radius`
///
/// # Output
///
/// A Shape representing a star

import { Shape } from './_';
import { V2 } from '../../base/V2/_';

export function star(pos: V2, outer_radius: number, inner_radius: number): Shape {
  return {
    type: 'star',
    pos,
    outer_radius,
    inner_radius
  };
}
