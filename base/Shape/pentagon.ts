import { Shape } from './_';
import { V2 } from '../V2/_';

// Creates a pentagon shape
// - center: the center point of the pentagon
// - side_size: the length of each side of the pentagon
// = a Shape representing a pentagon with the given center and side size
export function pentagon(center: V2, side_size: number, mass: number): Shape {
  const vertices: V2[] = calculate_pentagon_vertices(center, side_size);
  return { $: "polygon", vertices, mass };
}

// Calculates the vertices of a regular pentagon
// - center: the center point of the pentagon
// - side_size: the length of each side of the pentagon
// = an array of 5 V2 points representing the pentagon vertices
function calculate_pentagon_vertices(center: V2, side_size: number): V2[] {
  const radius = side_size / (2 * Math.sin(Math.PI / 5));
  const vertices: V2[] = [];

  for (let i = 0; i < 5; i++) {
    const angle = (2 * Math.PI * i) / 5 - Math.PI / 2;
    vertices.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle)
    });
  }

  return vertices;
}
