/// Draws a Shape on the canvas.
///
/// # Input
///
/// * `canvas` - The canvas rendering context
/// * `shape` - The Shape to draw
/// * `color` - The color to fill the shape with
///
/// # Output
///
/// This function doesn't return a value, but draws the shape on the canvas

import { Shape } from './_';
import { match } from './match';
import { V2 } from '../V2/_';

export function draw(canvas: CanvasRenderingContext2D, shape: Shape, color: string): void {
  canvas.fillStyle = color;
  match(shape, {
    line: (ini: V2, end: V2) => {
      canvas.beginPath();
      canvas.moveTo(ini.x, ini.y);
      canvas.lineTo(end.x, end.y);
      canvas.stroke();
    },
    circle: (pos: V2, rad: number) => {
      canvas.beginPath();
      canvas.arc(pos.x, pos.y, rad, 0, 2 * Math.PI);
      canvas.fill();
    },
    square: (pos: V2, side: number) => {
      canvas.fillRect(pos.x, pos.y, side, side);
    },
    triangle: (v1: V2, v2: V2, v3: V2) => {
      canvas.beginPath();
      canvas.moveTo(v1.x, v1.y);
      canvas.lineTo(v2.x, v2.y);
      canvas.lineTo(v3.x, v3.y);
      canvas.closePath();
      canvas.fill();
    },
    rectangle: (pos: V2, width: number, height: number) => {
      canvas.fillRect(pos.x - width / 2, pos.y - height / 2, width, height);
    },
    diamond: (pos: V2, width: number, height: number) => {
      canvas.beginPath();
      canvas.moveTo(pos.x, pos.y - height / 2);
      canvas.lineTo(pos.x + width / 2, pos.y);
      canvas.lineTo(pos.x, pos.y + height / 2);
      canvas.lineTo(pos.x - width / 2, pos.y);
      canvas.closePath();
      canvas.fill();
    },
    pentagon: (pos: V2, radius: number) => {
      const angle = (2 * Math.PI) / 5;
      canvas.beginPath();
      for (let i = 0; i < 5; i++) {
        const x = pos.x + radius * Math.cos(i * angle - Math.PI / 2);
        const y = pos.y + radius * Math.sin(i * angle - Math.PI / 2);
        if (i === 0) {
          canvas.moveTo(x, y);
        } else {
          canvas.lineTo(x, y);
        }
      }
      canvas.closePath();
      canvas.fill();
    },
    star: (pos: V2, outer_radius: number, inner_radius: number) => {
      const angle = Math.PI / 5;
      canvas.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = (i % 2 === 0) ? outer_radius : inner_radius;
        const x = pos.x + r * Math.cos(i * angle - Math.PI / 2);
        const y = pos.y + r * Math.sin(i * angle - Math.PI / 2);
        if (i === 0) {
          canvas.moveTo(x, y);
        } else {
          canvas.lineTo(x, y);
        }
      }
      canvas.closePath();
      canvas.fill();
    }
  });
}
