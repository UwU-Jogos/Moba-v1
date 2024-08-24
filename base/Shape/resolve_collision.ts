import { Shape } from './_';
import { V2 } from '../V2/_';
import { sub } from '../V2/sub';
import { add } from '../V2/add';
import { scale } from '../V2/scale';
import { normalize } from '../V2/normalize';
import { move } from './move';

// Resolves a collision between two shapes
// - shape1: the first shape involved in the collision
// - shape2: the second shape involved in the collision
// = an array containing the updated shapes after collision resolution
export function resolve_collision(shape1: Shape, shape2: Shape): [Shape, Shape] {
  const collision_normal = calculate_collision_normal(shape1, shape2);
  const relative_velocity = calculate_relative_velocity(shape1, shape2);
  
  // If shapes are moving apart, no resolution needed
  if (dot(relative_velocity, collision_normal) > 0) {
    return [shape1, shape2];
  }

  const restitution = 0.8; // Coefficient of restitution
  const impulse = calculate_impulse(shape1, shape2, collision_normal, relative_velocity, restitution);
  console.log("IMPULSE IS: ", impulse);

  return apply_impulse(shape1, shape2, collision_normal, impulse);
}

function calculate_collision_normal(shape1: Shape, shape2: Shape): V2 {
  // For simplicity, we'll use the vector between centers for circles
  // and the vector between closest points for polygons
  if (shape1.$ === "circle" && shape2.$ === "circle") {
    return normalize(sub(shape2.center, shape1.center));
  } else {
    // For more complex shapes, you'd need to implement a function to find the collision normal
    // This is a placeholder and should be replaced with proper collision normal calculation
    return { x: 1, y: 0 };
  }
}

function calculate_relative_velocity(shape1: Shape, shape2: Shape): V2 {
  // Assuming shapes have a velocity property. If not, you need to add it or pass it as a parameter
  const velocity1 = (shape1 as any).velocity || { x: 100, y: 1 };
  const velocity2 = (shape2 as any).velocity || { x: 0, y: 0 };
  return sub(velocity2, velocity1);
}

function dot(v1: V2, v2: V2): number {
  return v1.x * v2.x + v1.y * v2.y;
}

function calculate_impulse(shape1: Shape, shape2: Shape, normal: V2, relative_velocity: V2, restitution: number): number {
  const velocity_along_normal = dot(relative_velocity, normal);
  
  const inverse_mass1 = shape1.mass === Infinity ? 0 : 1 / shape1.mass;
  const inverse_mass2 = shape2.mass === Infinity ? 0 : 1 / shape2.mass;
  
  const impulse = -(1 + restitution) * velocity_along_normal / (inverse_mass1 + inverse_mass2);
  
  return impulse;
}

function apply_impulse(shape1: Shape, shape2: Shape, normal: V2, impulse: number): [Shape, Shape] {
  const inverse_mass1 = shape1.mass === Infinity ? 0 : 1 / shape1.mass;
  const inverse_mass2 = shape2.mass === Infinity ? 0 : 1 / shape2.mass;

  const impulse_vector1 = scale(normal, -impulse * inverse_mass1);
  const impulse_vector2 = scale(normal, impulse * inverse_mass2);

  const new_shape1 = move(shape1, impulse_vector1);
  const new_shape2 = move(shape2, impulse_vector2);

  return [new_shape1, new_shape2];
}

