import { GameState } from '../GameState/_';
import { Body } from './_';
import { V2 } from '../../base/V2/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { move } from '../../base/Shape/move';

// Clamps a body to the canvas boundaries
// - gs: The current game state
// - body: The body to be clamped
// = The updated GameState with the body clamped to the canvas
export function clamp_to_canvas(gs: GameState, body: Body): GameState {
  const { width, height } = get_canvas_dimensions();
  const new_pos = clamp_position(body.pos, body.hitbox, width, height);
  
  const updated_body: Body = {
    ...body,
    pos: new_pos,
    hitbox: move(body.hitbox, { x: new_pos.x - body.pos.x, y: new_pos.y - body.pos.y })
  };

  return {
    ...gs,
    game_map: {
      ...gs.game_map,
      bodies: gs.game_map.bodies.set(body.id, updated_body)
    }
  };
}

// Helper function to clamp a position within canvas boundaries
function clamp_position(pos: V2, hitbox: Body['hitbox'], width: number, height: number): V2 {
  let min_x = 0;
  let min_y = 0;
  let max_x = width;
  let max_y = height;

  switch (hitbox.$) {
    case "circle": {
      min_x = hitbox.radius;
      min_y = hitbox.radius;
      max_x = width - hitbox.radius;
      max_y = height - hitbox.radius;
      break;
    }
    case "polygon": {
      const x_coords = hitbox.vertices.map(v => v.x);
      const y_coords = hitbox.vertices.map(v => v.y);
      const min_vertex_x = Math.min(...x_coords);
      const max_vertex_x = Math.max(...x_coords);
      const min_vertex_y = Math.min(...y_coords);
      const max_vertex_y = Math.max(...y_coords);
      min_x = -min_vertex_x;
      min_y = -min_vertex_y;
      max_x = width - max_vertex_x;
      max_y = height - max_vertex_y;
      break;
    }
  }

  return {
    x: Math.max(min_x, Math.min(max_x, pos.x)),
    y: Math.max(min_y, Math.min(max_y, pos.y))
  };
}
