/// Restarts the game state.
///
/// # Input
///
/// * `state` - The current GameState
///
/// # Output
///
/// Returns a new GameState with existing players redistributed in quadrants and full life.

import { GameState } from './_';
import { init as init_game } from '../Game/init';
import { init as init_player } from '../Player/init';
import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';
import { PLAYERS_LIMIT } from '../Helpers/consts';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';

export function restart(state: GameState): GameState {
  const initial_state = init_game();
  const { width, height } = get_canvas_dimensions();

  const quadrant_width = width / 2;
  const quadrant_height = height / 2;

  const players = state.players.withMutations(mutable_map => {
    let i = 0;
    mutable_map.forEach((player, uid) => {
      const quadrant_x = i % 2;
      const quadrant_y = Math.floor(i / 2);

      const pos = {
        x: quadrant_x * quadrant_width + Math.random() * quadrant_width,
        y: quadrant_y * quadrant_height + Math.random() * quadrant_height
      };

      const new_player = init_player(uid, player.name, pos);
      mutable_map.set(uid, new_player);
      i++;
    });
  });

  return {
    ...initial_state,
    players
  };
}
