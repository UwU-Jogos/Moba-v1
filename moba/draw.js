function draw(ctx, shape, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;

  switch (shape.$) {
    case "Circle": {
      const { center, radius } = shape;
      ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      break;
    }
    case "Polygon": {
      const { center, vertices } = shape;
      ctx.moveTo(center.x + vertices.head.x, center.y + vertices.head.y);
      let current = vertices.tail;
      while (current.$!== "Nil") {
        ctx.lineTo(center.x + current.head.x, center.y + current.head.y);
        current = current.tail;
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
}

function draw_number(ctx, number, x, y, fontSize = 16, color = "black") {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(number.toString(), x, y);
}

export { draw, draw_number };
