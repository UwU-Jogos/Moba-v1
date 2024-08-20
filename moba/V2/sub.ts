/// Subtracts one 2D vector from another.
///
/// # Input
///
/// * `v1` - The first 2D vector (minuend)
/// * `v2` - The second 2D vector (subtrahend)
///
/// # Output
///
/// A new 2D vector that is the result of subtracting v2 from v1

import { V2 } from './_';

export function sub(v1: V2, v2: V2): V2 {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  };
}
