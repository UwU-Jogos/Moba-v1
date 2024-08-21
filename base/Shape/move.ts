import { Shape } from './_';
import { V2 } from '../V2/_';
import { add } from '../V2/add';

// Moves a shape by a given vector
// - shape: the shape to move
// - v: the vector to move the shape by
// = a new shape moved by the given vector
export function move(shape: Shape, v: V2): Shape {
  switch (shape.$) {
    case "circle": {
      return {
        $: "circle",
        center: add(shape.center, v),
        radius: shape.radius
      };
    }
    case "polygon": {
      return {
        $: "polygon",
        vertices: shape.vertices.map(vertex => add(vertex, v))
      };
    }
  }
}
