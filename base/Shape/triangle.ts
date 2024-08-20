import { Shape } from './_';
import { V2 } from '../V2/_';

// Creates a triangle shape using the polygon constructor
// - v1: the first vertex of the triangle
// - v2: the second vertex of the triangle
// - v3: the third vertex of the triangle
// = a Shape representing a triangle with the given vertices
export function triangle(v1: V2, v2: V2, v3: V2): Shape {
  return { $: "polygon", vertices: [v1, v2, v3] };
}