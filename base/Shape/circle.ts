import { Shape } from './_';
import { V2 } from '../V2/_';

// Creates a circle shape
// - center: the center point of the circle
// - radius: the radius of the circle
// = a Shape representing a circle with the given center and radius
export function circle(center: V2, radius: number, mass: number): Shape {
  return { $: "circle", center, radius, mass };
}
