/// Normalizes a 2D vector.
///
/// # Input
///
/// * `v` - The 2D vector to normalize
///
/// # Output
///
/// A new 2D vector that is the normalized version of the input vector

import { V2 } from './_';

export function normalize(v: V2): V2 {
  const length = Math.sqrt(v.x * v.x + v.y * v.y);
  if (length === 0) {
    return { x: 0, y: 0 };
  }
  return {
    x: v.x / length,
    y: v.y / length
  };
}
