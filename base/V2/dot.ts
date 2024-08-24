import { V2 } from './_';

// Calculates the dot product of two 2D vectors
// - v1: the first vector
// - v2: the second vector
// = the dot product of v1 and v2
export function dot(v1: V2, v2: V2): number {
  return v1.x * v2.x + v1.y * v2.y;
}
