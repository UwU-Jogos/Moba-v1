import { Shape } from './_';
import { V2 } from '../V2/_';
import { compute_aabb } from './compute_aabb';
import { sort_and_sweep } from './sort_and_sweep';
import { dot } from '../V2/dot';
import { normalize } from '../V2/normalize';

// Performs collision detection on a list of shapes
// - shapes: the list of shapes to check for collisions
// = a list of pairs of indices representing colliding shapes
export function collision(shapes: Shape[]): [number, number][] {
  return detect_collisions(shapes);
}

type ShapeWithIndex = Shape & { index: number };

function broad_phase_collision_detection(shapes: Shape[]): [number, number][] {
  const shapes_with_index: ShapeWithIndex[] = shapes.map((shape, index) => ({ ...shape, index }));
  return sort_and_sweep(shapes_with_index);
}

function circle_circle_collision(circle1: Shape, circle2: Shape): boolean {
  if (circle1.$ !== "circle" || circle2.$ !== "circle") {
    throw new Error("Both shapes must be circles");
  }
  
  const distance_squared = 
    Math.pow(circle1.center.x - circle2.center.x, 2) +
    Math.pow(circle1.center.y - circle2.center.y, 2);
  
  const radii_sum = circle1.radius + circle2.radius;
  
  return distance_squared <= radii_sum * radii_sum;
}

function polygon_polygon_collision(poly1: Shape, poly2: Shape): boolean {
  if (poly1.$ !== "polygon" || poly2.$ !== "polygon") {
    throw new Error("Both shapes must be polygons");
  }

  const edges1 = get_edges(poly1.vertices);
  const edges2 = get_edges(poly2.vertices);
  
  for (const edge of [...edges1, ...edges2]) {
    const axis = normalize({ x: -edge.y, y: edge.x });
    const [min1, max1] = project_polygon(poly1.vertices, axis);
    const [min2, max2] = project_polygon(poly2.vertices, axis);
    
    if (max1 < min2 || max2 < min1) {
      return false;
    }
  }
  
  return true;
}

function get_edges(vertices: V2[]): V2[] {
  const edges: V2[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % vertices.length];
    edges.push({ x: p2.x - p1.x, y: p2.y - p1.y });
  }
  return edges;
}

function project_polygon(vertices: V2[], axis: V2): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  
  for (const vertex of vertices) {
    const projection = dot(vertex, axis);
    min = Math.min(min, projection);
    max = Math.max(max, projection);
  }
  
  return [min, max];
}

function circle_polygon_collision(circle: Shape, polygon: Shape): boolean {
  if (circle.$ !== "circle" || polygon.$ !== "polygon") {
    throw new Error("Shapes must be a circle and a polygon");
  }
  
  const edges = get_edges(polygon.vertices);
  for (const edge of edges) {
    const axis = normalize({ x: -edge.y, y: edge.x });
    const [polyMin, polyMax] = project_polygon(polygon.vertices, axis);
    const circleProjection = dot(circle.center, axis);
    
    if (circleProjection + circle.radius < polyMin || circleProjection - circle.radius > polyMax) {
      return false;
    }
  }
  
  const closest_vertex = find_closest_point_on_polygon(circle.center, polygon.vertices);
  const axis = normalize({
    x: closest_vertex.x - circle.center.x,
    y: closest_vertex.y - circle.center.y
  });
  const [polyMin, polyMax] = project_polygon(polygon.vertices, axis);
  const circleProjection = dot(circle.center, axis);
  
  if (circleProjection + circle.radius < polyMin || circleProjection - circle.radius > polyMax) {
    return false;
  }
  
  return true;
}

function find_closest_point_on_polygon(point: V2, vertices: V2[]): V2 {
  let closest_point = vertices[0];
  let min_distance = Math.pow(point.x - vertices[0].x, 2) + Math.pow(point.y - vertices[0].y, 2);
  
  for (let i = 1; i < vertices.length; i++) {
    const distance = Math.pow(point.x - vertices[i].x, 2) + Math.pow(point.y - vertices[i].y, 2);
    if (distance < min_distance) {
      min_distance = distance;
      closest_point = vertices[i];
    }
  }
  
  return closest_point;
}

function narrow_phase_collision_detection(shape1: Shape, shape2: Shape): boolean {
  if (shape1.$ === "circle" && shape2.$ === "circle") {
    return circle_circle_collision(shape1, shape2);
  } else if (shape1.$ === "polygon" && shape2.$ === "polygon") {
    return polygon_polygon_collision(shape1, shape2);
  } else if (
    (shape1.$ === "circle" && shape2.$ === "polygon") ||
    (shape1.$ === "polygon" && shape2.$ === "circle")
  ) {
    const circle = shape1.$ === "circle" ? shape1 : shape2;
    const polygon = shape1.$ === "polygon" ? shape1 : shape2;
    return circle_polygon_collision(circle, polygon);
  }
  
  throw new Error("Unsupported shape combination");
}

function detect_collisions(shapes: Shape[]): [number, number][] {
  const potential_collisions = broad_phase_collision_detection(shapes);
  const actual_collisions: [number, number][] = [];
  
  for (const [i, j] of potential_collisions) {
    if (narrow_phase_collision_detection(shapes[i], shapes[j])) {
      actual_collisions.push([i, j]);
    }
  }
  
  return actual_collisions;
}
