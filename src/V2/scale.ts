/// Scales a 2D vector by a scalar value.
///
/// # Input
///
/// * `v` - The 2D vector to scale
/// * `scalar` - The scalar value to multiply the vector by
///
/// # Output
///
/// A new 2D vector that is the result of scaling the input vector

import { V2 } from './_';

export function scale(v: V2, scalar: number): V2 {
  return {
    x: v.x * scalar,
    y: v.y * scalar
  };
}
