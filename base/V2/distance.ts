import { V2 } from './_';

// Calculates the Euclidean distance between two 2D vectors
// - v1: the first vector
// - v2: the second vector
// = the distance between v1 and v2
export function distance(v1: V2, v2: V2): number {
  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
