import { Effect } from './_';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';
import { Body } from '../Body/_';
import { add } from '../../base/V2/add';
import { move as move_shape } from '../../base/Shape/move';
import { draw as draw_shape } from '../../base/Shape/draw';

// Moves a body by a given vector
// - body: the Body to move
// - movement: the vector to move the body by
// = an Effect that updates the GameState with the moved body
export function move(body: Body, movement: V2): Effect<boolean> {
  return (gs: GameState): [GameState, boolean] => {
    const new_pos = add(body.pos, movement);
    const updated_shape = move_shape(body.hitbox, movement);
    const updated_body = {
      ...body,
      pos: new_pos,
      hitbox: updated_shape,
      draw: (ctx: CanvasRenderingContext2D): void => {
        draw_shape(ctx, updated_shape);
      }
    };

    const updated_bodies = gs.game_map.bodies.map(b => 
      b.id === body.id ? updated_body : b
    );

    const updated_gs: GameState = {
      ...gs,
      game_map: {
        ...gs.game_map,
        bodies: updated_bodies
      }
    };

    return [updated_gs, true];
  };
}
