import { V2 } from './_';

// Adds two 2D vectors
// - v1: the first vector
// - v2: the second vector
// = a new vector that is the sum of v1 and v2
export function add(v1: V2, v2: V2): V2 {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}
