import { V2 } from './_';

// Subtracts one 2D vector from another
// - v1: the first vector (minuend)
// - v2: the second vector (subtrahend)
// = a new vector that is the result of subtracting v2 from v1
export function sub(v1: V2, v2: V2): V2 {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  };
}
