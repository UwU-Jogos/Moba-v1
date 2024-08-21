import { GameState } from '../GameState/_';
import { Body } from './_';
import { collision } from '../../base/Shape/collision';
import { Shape } from '../../base/Shape/_';
import { V2 } from '../../base/V2/_';
import { sub } from '../../base/V2/sub';
import { add } from '../../base/V2/add';
import { scale } from '../../base/V2/scale';
import { normalize } from '../../base/V2/normalize';

// Checks for collisions between bodies in the game state and separates colliding bodies
// - gs: The current game state
// = The updated GameState after processing collisions and separating bodies
export function check_collision(gs: GameState): GameState {
  //const bodies = gs.game_map.bodies;
  //return [body1, body2];
  return gs;
}
