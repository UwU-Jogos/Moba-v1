import { Shape } from './_';
import { compute_aabb } from './compute_aabb';

// Represents a Shape with an associated index
type ShapeWithIndex = Shape & { index: number };

// Performs the Sort and Sweep algorithm for broad-phase collision detection
// - shapes: array of shapes with their indices
// = array of pairs of indices representing potentially colliding shapes
export function sort_and_sweep(shapes: ShapeWithIndex[]): [number, number][] {
  // Sort shapes based on their minimum x-coordinate
  shapes.sort((a, b) => compute_aabb(a).min.x - compute_aabb(b).min.x);
  
  let active_shapes: ShapeWithIndex[] = [];
  const potential_collisions: [number, number][] = [];

  for (const shape of shapes) {
    const shape_aabb = compute_aabb(shape);
    
    // Remove shapes from active list that can no longer collide
    active_shapes = active_shapes.filter(active_shape => 
      compute_aabb(active_shape).max.x >= shape_aabb.min.x
    );

    // Check for potential collisions with active shapes
    for (const active_shape of active_shapes) {
      const active_shape_aabb = compute_aabb(active_shape);
      if (shape_aabb.min.y <= active_shape_aabb.max.y && shape_aabb.max.y >= active_shape_aabb.min.y) {
        potential_collisions.push([active_shape.index, shape.index]);
      }
    }

    // Add current shape to active shapes
    active_shapes.push(shape);
  }

  return potential_collisions;
}
