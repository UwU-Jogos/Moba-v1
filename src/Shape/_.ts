/// Represents a geometric shape.
///
/// # Description
///
/// The Shape type can be a Line, Circle, Square, Triangle, or Rectangle.
///
/// # Constructors
///
/// * `Line` - Represents a line segment with initial and end points
///   * `ini` - The initial point of the line (V2)
///   * `end` - The end point of the line (V2)
/// * `Circle` - Represents a circle with a center point and radius
///   * `pos` - The center point of the circle (V2)
///   * `rad` - The radius of the circle (number)
/// * `Square` - Represents a square with a top-left corner and side length
///   * `pos` - The top-left corner of the square (V2)
///   * `side` - The length of a side of the square (number)
/// * `Triangle` - Represents a triangle with three vertices
///   * `v1` - The first vertex of the triangle (V2)
///   * `v2` - The second vertex of the triangle (V2)
///   * `v3` - The third vertex of the triangle (V2)
/// * `Rectangle` - Represents a rectangle with a top-left corner, width, and height
///   * `pos` - The top-left corner of the rectangle (V2)
///   * `width` - The width of the rectangle (number)
///   * `height` - The height of the rectangle (number)

import { V2 } from '../V2/_';

export type Shape =
  | { type: 'line', ini: V2, end: V2 }
  | { type: 'circle', pos: V2, rad: number }
  | { type: 'square', pos: V2, side: number }
  | { type: 'triangle', v1: V2, v2: V2, v3: V2 }
  | { type: 'rectangle', pos: V2, width: number, height: number }