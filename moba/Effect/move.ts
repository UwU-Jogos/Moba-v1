import { Effect } from './_';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';
import { Body } from '../Body/_';
import { add } from '../../base/V2/add';
import { move as move_shape } from '../../base/Shape/move';

// Moves a body by a given vector
// - body_id: the ID of the Body to move
// - movement: the vector to move the body by
// = an Effect that updates the GameState with the moved body
export function move(body_id: string, movement: V2): Effect<boolean> {
  return (gs: GameState): [GameState, boolean] => {
    var bodies = gs.game_map.bodies;
    
    if (!bodies.has(body_id)) {
      return [gs, false];
    }

    var body = bodies.get(body_id);
    if (!body) {
      return [gs, false];
    }

    var new_pos = add(body.pos, movement);
    var new_hitbox = move_shape(body.hitbox, movement);

    var updated_body: Body = { ...body, pos: new_pos, hitbox: new_hitbox };
    var updated_bodies = bodies.set(body_id, updated_body);

    var new_gs: GameState = {
      ...gs,
      game_map: {
        ...gs.game_map,
        bodies: updated_bodies
      }
    };

    return [new_gs, true];
  };
}
