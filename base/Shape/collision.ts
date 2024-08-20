import { Shape } from './_';
import { V2 } from '../V2/_';
import { distance } from '../V2/distance';

// Checks if two shapes are colliding
// - shape1: the first shape
// - shape2: the second shape
// = true if the shapes are colliding, false otherwise
export function collision(shape1: Shape, shape2: Shape): boolean {
  switch (shape1.$) {
    case "circle":
      switch (shape2.$) {
        case "circle":
          return circle_circle_collision(shape1, shape2);
        case "polygon":
          return circle_polygon_collision(shape1, shape2);
      }
    case "polygon":
      switch (shape2.$) {
        case "circle":
          return circle_polygon_collision(shape2, shape1);
        case "polygon":
          return polygon_polygon_collision(shape1, shape2);
      }
  }
}

// Checks collision between two circles
function circle_circle_collision(circle1: Shape, circle2: Shape): boolean {
  if (circle1.$ !== "circle" || circle2.$ !== "circle") return false;
  const dist = distance(circle1.center, circle2.center);
  return dist <= circle1.radius + circle2.radius;
}

// Checks collision between a circle and a polygon
function circle_polygon_collision(circle: Shape, polygon: Shape): boolean {
  if (circle.$ !== "circle" || polygon.$ !== "polygon") return false;
  
  // Check if the circle's center is inside the polygon
  if (point_in_polygon(circle.center, polygon.vertices)) {
    return true;
  }

  // Check if any polygon edge intersects with the circle
  for (let i = 0; i < polygon.vertices.length; i++) {
    const start = polygon.vertices[i];
    const end = polygon.vertices[(i + 1) % polygon.vertices.length];
    if (line_circle_intersection(start, end, circle.center, circle.radius)) {
      return true;
    }
  }

  return false;
}

// Checks collision between two polygons
function polygon_polygon_collision(poly1: Shape, poly2: Shape): boolean {
  if (poly1.$ !== "polygon" || poly2.$ !== "polygon") return false;

  // Check if any vertex of poly1 is inside poly2
  for (const vertex of poly1.vertices) {
    if (point_in_polygon(vertex, poly2.vertices)) {
      return true;
    }
  }

  // Check if any vertex of poly2 is inside poly1
  for (const vertex of poly2.vertices) {
    if (point_in_polygon(vertex, poly1.vertices)) {
      return true;
    }
  }

  // Check if any edges intersect
  for (let i = 0; i < poly1.vertices.length; i++) {
    for (let j = 0; j < poly2.vertices.length; j++) {
      const start1 = poly1.vertices[i];
      const end1 = poly1.vertices[(i + 1) % poly1.vertices.length];
      const start2 = poly2.vertices[j];
      const end2 = poly2.vertices[(j + 1) % poly2.vertices.length];
      if (line_line_intersection(start1, end1, start2, end2)) {
        return true;
      }
    }
  }

  return false;
}

// Checks if a point is inside a polygon
function point_in_polygon(point: V2, vertices: V2[]): boolean {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x, yi = vertices[i].y;
    const xj = vertices[j].x, yj = vertices[j].y;
    const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Checks if a line segment intersects with a circle
function line_circle_intersection(start: V2, end: V2, center: V2, radius: number): boolean {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const a = dx * dx + dy * dy;
  const b = 2 * (dx * (start.x - center.x) + dy * (start.y - center.y));
  let c = center.x * center.x + center.y * center.y;
  c += start.x * start.x + start.y * start.y;
  c -= 2 * (center.x * start.x + center.y * start.y);
  c -= radius * radius;
  const bb4ac = b * b - 4 * a * c;

  if (bb4ac < 0) {
    return false;  // No intersection
  }

  const t1 = (-b + Math.sqrt(bb4ac)) / (2 * a);
  const t2 = (-b - Math.sqrt(bb4ac)) / (2 * a);

  if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)) {
    return true;  // Intersection
  }

  return false;
}

// Checks if two line segments intersect
function line_line_intersection(start1: V2, end1: V2, start2: V2, end2: V2): boolean {
  const det = (end1.x - start1.x) * (end2.y - start2.y) - (end2.x - start2.x) * (end1.y - start1.y);
  if (det === 0) {
    return false;  // Lines are parallel
  }
  const lambda = ((end2.y - start2.y) * (end2.x - start1.x) + (start2.x - end2.x) * (end2.y - start1.y)) / det;
  const gamma = ((start1.y - end1.y) * (end2.x - start1.x) + (end1.x - start1.x) * (end2.y - start1.y)) / det;
  return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
}
