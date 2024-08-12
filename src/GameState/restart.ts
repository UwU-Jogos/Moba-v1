/// Restarts the game state.
///
/// # Input
///
/// * `state` - The current GameState
///
/// # Output
///
/// Returns a new GameState with existing players redistributed in corners and full life.

import { GameState } from './_';
import { init as init_game } from '../Game/init';
import { init as init_player } from '../Player/init';
import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';
import { PLAYERS_LIMIT } from '../Helpers/consts';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { CharacterType } from '../Character/type';

export function restart(state: GameState): GameState {
  const initial_state = init_game();

  const players = state.players.withMutations(mutable_map => {
    mutable_map.forEach((player, uid) => {
      const new_player = init_player(uid, player.name, player.character);
      new_player.stats = player.stats;
      mutable_map.set(uid, new_player);
    });
  });

  return {
    ...initial_state,
    players
  };
}
