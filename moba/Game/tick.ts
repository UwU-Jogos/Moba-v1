import { GameState } from '../GameState/_';
import { Body } from '../Body/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { TPS } from '../Helpers/consts';
import { check_collision } from '../Body/check_collision';

// Updates the game state for a single tick.
// - gs: The current game state
// = The updated GameState after processing a single tick
export function tick(gs: GameState): GameState {
  let updated_gs = gs;

  gs.game_map.bodies.forEach((body : Body) => {
    updated_gs = body.tick(updated_gs);
  });

  return {
    ...updated_gs,
    tick: updated_gs.tick + 1  
  };
}
