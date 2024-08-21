import { Player } from './_';
import { Body } from '../Body/_';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';
import { Shape } from '../../base/Shape/_';
import { circle } from '../../base/Shape/circle';
import { draw as draw_shape } from '../../base/Shape/draw';
import { move } from '../Effect/move';
import { move as move_shape } from '../../base/Shape/move';


// DEFAULT functions that will become HERO specific functions
function draw_fn(shape: Shape) {
  return (ctx: CanvasRenderingContext2D): void => {
    draw_shape(ctx, shape);
  };
}

function tick_fn(player_id: number): (gs: GameState) => GameState {
  return (gs: GameState): GameState => {
    const player = gs.players.find(p => p.id === player_id);
    if (!player) return gs;

    const movement: V2 = { x: 0, y: 0 };
    if (player.key.D) movement.x += 3;
    if (player.key.A) movement.x -= 3;
    if (player.key.S) movement.y += 3;
    if (player.key.W) movement.y -= 3;

    if (movement.x !== 0 || movement.y !== 0) {
      const [updated_gs, _] = move(player.body, movement)(gs);

      const updated_player = updated_gs.players.find(p => p.id === player_id);
      if (updated_player) {
        const new_shape = move_shape(updated_player.body.hitbox, movement);
        updated_player.body.hitbox = new_shape;
        updated_player.body.draw = draw_fn(new_shape);
      }

      return updated_gs;
    }

    return gs;
  };
}

let last_pos = { x: 100, y: 100 };

export function init(id: number, name: string): Player {
  const pos: V2 = last_pos;
  last_pos = { x: pos.x + 100, y: pos.y + 50 };
  const hitbox = circle(pos, 10);
  const body_id = `${name}-${Date.now()}`;

  const body: Body = {
    id: body_id,
    hitbox: hitbox,
    pos: pos,
    tick: tick_fn(id),
    draw: draw_fn(hitbox),
  };

  const initial_player: Player = {
    id,
    name,
    pos,
    target_pos: pos,
    life: 200,
    key: {},
    body
  };
  return initial_player;
}
