/// Represents a geometric shape.
///
/// # Description
///
/// The Shape type can be a Line, Circle, Square, Triangle, Rectangle, Diamond, Star, or Pentagon.
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
/// * `Diamond` - Represents a diamond with a center point and width/height
///   * `pos` - The center point of the diamond (V2)
///   * `width` - The width of the diamond (number)
///   * `height` - The height of the diamond (number)
/// * `Star` - Represents a five-pointed star with a center point and outer radius
///   * `pos` - The center point of the star (V2)
///   * `outerRadius` - The radius from the center to the outer points of the star (number)
///   * `innerRadius` - The radius from the center to the inner points of the star (number)
/// * `Pentagon` - Represents a regular pentagon with a center point and radius
///   * `pos` - The center point of the pentagon (V2)
///   * `radius` - The radius of the circumscribed circle of the pentagon (number)

import { V2 } from '../V2/_';

export type Shape =
  | { type: 'line', ini: V2, end: V2 }
  | { type: 'circle', pos: V2, rad: number }
  | { type: 'square', pos: V2, side: number }
  | { type: 'triangle', v1: V2, v2: V2, v3: V2 }
  | { type: 'rectangle', pos: V2, width: number, height: number }
  | { type: 'diamond', pos: V2, width: number, height: number }
  | { type: 'star', pos: V2, outer_radius: number, inner_radius: number }
  | { type: 'pentagon', pos: V2, radius: number };
