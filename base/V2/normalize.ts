import { V2 } from './_';

// Normalizes a 2D vector
// - v: the vector to normalize
// = a new vector with the same direction as v but with a magnitude of 1
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
