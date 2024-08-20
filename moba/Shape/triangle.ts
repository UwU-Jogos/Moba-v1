/// Creates a triangle shape.
///
/// # Input
///
/// * `v1` - The first vertex of the triangle (V2)
/// * `v2` - The second vertex of the triangle (V2)
/// * `v3` - The third vertex of the triangle (V2)
///
/// # Output
///
/// A Shape representing a triangle

import { V2 } from '../../base/V2/_';
import { Shape } from './_';

export function triangle(v1: V2, v2: V2, v3: V2): Shape {
  return {
    type: 'triangle',
    v1,
    v2,
    v3
  };
}