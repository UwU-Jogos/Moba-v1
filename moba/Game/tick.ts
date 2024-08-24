import { GameState } from '../GameState/_';
import { Body } from '../Body/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { TPS } from '../Helpers/consts';
import { check_collision } from '../Body/check_collision';
import { clamp_to_canvas } from '../Body/clamp_to_canvas';
import { collision } from '../../base/Shape/collision';
import { resolve_collision } from '../../base/Shape/resolve_collision';
import { Shape } from '../../base/Shape/_';
import { Map } from 'immutable';
import { V2 } from '../../base/V2/_';
import { sub } from '../../base/V2/sub';
import { scale } from '../../base/V2/scale';

// Updates the game state for a single tick.
// - gs: The current game state
// = The updated GameState after processing a single tick
export function tick(gs: GameState): GameState {
  let updated_gs = gs;

  const keys: string[] = updated_gs.game_map.bodies.keySeq().toArray();
  const bodies: Body[] = updated_gs.game_map.bodies.valueSeq().toArray();

  let updated_bodies = updated_gs.game_map.bodies;
  bodies.forEach((body: Body) => {
    let new_gs = body.tick(updated_gs);
    updated_bodies = new_gs.game_map.bodies;
    updated_gs = new_gs;
  });

  const shapes: Shape[] = updated_bodies.valueSeq().toArray().map((body: Body) => body.hitbox);
  const colliding_pairs: [number, number][] = collision(shapes);

  // resolve collisions
  for (const [i, j] of colliding_pairs) {
    const body1 = updated_bodies.get(keys[i]);
    const body2 = updated_bodies.get(keys[j]);
    if (body1 && body2) {
      const [resolved_shape1, resolved_shape2] = resolve_collision(body1.hitbox, body2.hitbox);

      const move1: V2 = calculate_movement(body1.hitbox, resolved_shape1);
      const move2: V2 = calculate_movement(body2.hitbox, resolved_shape2);

      updated_bodies = updated_bodies.set(keys[i], {
        ...body1,
        hitbox: resolved_shape1,
        pos: {
          x: body1.pos.x + move1.x,
          y: body1.pos.y + move1.y
        }
      });
      updated_bodies = updated_bodies.set(keys[j], {
        ...body2,
        hitbox: resolved_shape2,
        pos: {
          x: body2.pos.x + move2.x,
          y: body2.pos.y + move2.y
        }
      });
    }
  }

  updated_bodies.forEach((body: Body) => {
    updated_gs = clamp_to_canvas(updated_gs, body);
  });

  return {
    ...updated_gs,
    tick: updated_gs.tick + 1,
    game_map: {
      ...updated_gs.game_map,
      bodies: updated_bodies
    }
  };
}

function calculate_movement(old_shape: Shape, new_shape: Shape): V2 {
  if (old_shape.$ === "circle" && new_shape.$ === "circle") {
    return sub(new_shape.center, old_shape.center);
  } else if (old_shape.$ === "polygon" && new_shape.$ === "polygon") {
    return sub(new_shape.vertices[0], old_shape.vertices[0]);
  } else {
    return { x: 0, y: 0 };
  }
}
