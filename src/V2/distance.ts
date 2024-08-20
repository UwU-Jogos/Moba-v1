/// Calculates the distance between two 2D vectors.
///
/// # Input
///
/// * `v1` - The first 2D vector
/// * `v2` - The second 2D vector
///
/// # Output
///
/// The Euclidean distance between the two input vectors

import { V2 } from './_';

export function distance(v1: V2, v2: V2): number {
  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
