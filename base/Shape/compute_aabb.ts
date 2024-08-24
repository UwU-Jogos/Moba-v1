import { Shape } from './_';
import { V2 } from '../V2/_';

// Computes the Axis-Aligned Bounding Box (AABB) for a given shape
// - shape: the input shape (either a circle or a polygon)
// = an object containing the minimum and maximum points of the AABB
export function compute_aabb(shape: Shape): { min: V2; max: V2 } {
  switch (shape.$) {
    case "circle": {
      return {
        min: { x: shape.center.x - shape.radius, y: shape.center.y - shape.radius },
        max: { x: shape.center.x + shape.radius, y: shape.center.y + shape.radius }
      };
    }
    case "polygon": {
      var min = { x: Infinity, y: Infinity };
      var max = { x: -Infinity, y: -Infinity };
      for (var vertex of shape.vertices) {
        min.x = Math.min(min.x, vertex.x);
        min.y = Math.min(min.y, vertex.y);
        max.x = Math.max(max.x, vertex.x);
        max.y = Math.max(max.y, vertex.y);
      }
      return { min, max };
    }
  }
}