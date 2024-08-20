import { V2 } from '../V2/_';

// Represents a geometric shape
// - Circle: a circle with a center point and radius
// - Polygon: a polygon defined by an array of vertices
export type Shape
  = { $: "circle", center: V2, radius: number }
  | { $: "polygon", vertices: V2[] };