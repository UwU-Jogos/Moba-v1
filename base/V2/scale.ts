import { V2 } from './_';

// Scales a 2D vector by a scalar value
// - v: the vector to scale
// - scalar: the scaling factor
// = a new vector that is the result of scaling v by scalar
export function scale(v: V2, scalar: number): V2 {
  return {
    x: v.x * scalar,
    y: v.y * scalar
  };
}