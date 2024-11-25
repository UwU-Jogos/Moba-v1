function draw(ctx, shape, color = "black", side = "Neutral") { 
  ctx.beginPath();

  let real_side = (side?.$) ? side.$ : side
  switch (real_side) {
    case "Red":
      ctx.fillStyle = "red";
      break;
    case "Blue":
      ctx.fillStyle = "blue";
      break;
    case "Neutral":
    default:
      ctx.fillStyle = color;
  }

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

function traverseBodies(bodies, callback) {
  for (const [key, body] of bodies.entries()) {
    if (body.$ == "Some") {
      callback(body.value.hitbox, body.value.side);
    }
  }
}


function drawHeroState(hero_state_id, hero_state, state) { 
  let hero_body = state.game_map.bodies.get(hero_state_id)?.value?.hitbox;
  if (!hero_body) return;
  let center = hero_body.center;
  let health = hero_state.health;
  let health_center = { x: (center.x - 15), y: (center.y + 40) }
  
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  draw_number(ctx, health, health_center.x, health_center.y);
}

function traverseHeroStates(state, hero_states, callback) {
  for (const [key, body] of hero_states.entries()) {
    if (body.$ == "Some") {
      callback(key, body.value, state);
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

  const draw_shape_callback = (shape, side) => {
    draw(ctx, shape, "black", side);
  }

  const bodies = state.game_map.bodies;
  traverseBodies(bodies, draw_shape_callback);
  
  const hero_states = state.hero_states;
  traverseHeroStates(state, hero_states, drawHeroState);
}

function draw_number(ctx, number, x, y, fontSize = 16, color = "black") {
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(number.toString(), x, y);
}

export { draw, draw_number, draw_state };
