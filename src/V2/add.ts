/// Adds two 2D vectors.
///
/// # Input
///
/// * `v1` - The first 2D vector
/// * `v2` - The second 2D vector
///
/// # Output
///
/// A new 2D vector that is the sum of the input vectors
import { V2 } from './_';

export function add(v1: V2, v2: V2): V2 {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}
