import { Shape } from './_';
import { V2 } from '../V2/_';
import { add } from '../V2/add';
import { sub } from '../V2/sub';

// Creates a square shape using a polygon representation
// - center: the center point of the square
// - side: the length of a side of the square
// = a Shape representing a square with the given center and side length
export function square(center: V2, side: number): Shape {
  // Calculate half of the side length
  const half_side = side / 2;

  // Calculate the four vertices of the square
  const top_left     = sub(center, { x: half_side, y: half_side });
  const top_right    = add(center, { x: half_side, y: -half_side });
  const bottom_right = add(center, { x: half_side, y: half_side });
  const bottom_left  = add(center, { x: -half_side, y: half_side });

  // Create the polygon using the vertices
  return { $: "polygon", vertices: [top_left, top_right, bottom_right, bottom_left] };
}
