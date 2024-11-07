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

function traverseTree(node, callback) {
  if (!node || typeof node !== 'object') return;

  // If the node has a key_value with a snd property, call the callback with it
  if (node.key_value && node.key_value.snd) {
    callback(node.key_value.snd.hitbox);
  }

  // Recursively traverse left and right children if they exist
  if (node.left && node.left.$ === 'Node') {
    traverseTree(node.left, callback);
  }
  if (node.right && node.right.$ === 'Node') {
    traverseTree(node.right, callback);
  }
}

function draw_state(state) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const draw_shape_callback = (shape) => {
    draw(ctx, shape);
  }

  const bodies_tree = state.game_map.bodies;
  traverseTree(bodies_tree, draw_shape_callback);
}

function draw_number(ctx, number, x, y, fontSize = 16, color = "black") {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(number.toString(), x, y);
}

export { draw, draw_number, draw_state };
