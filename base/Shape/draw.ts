import { Shape } from "./_";
import { V2 } from "../V2/_";

// Draws a Shape on the canvas
// - ctx: The canvas rendering context
// - shape: The Shape to be drawn
// - color: The color to use for drawing (optional, default is black)
export function draw(ctx: CanvasRenderingContext2D, shape: Shape, color: string = "black"): void {
  ctx.beginPath();
  ctx.fillStyle = color;

  switch (shape.$) {
    case "circle": {
      ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
      ctx.fill();
      break;
    }
    case "polygon": {
      if (shape.vertices.length > 0) {
        ctx.moveTo(shape.vertices[0].x, shape.vertices[0].y);
        for (let i = 1; i < shape.vertices.length; i++) {
          ctx.lineTo(shape.vertices[i].x, shape.vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
      }
      break;
    }
  }
}
