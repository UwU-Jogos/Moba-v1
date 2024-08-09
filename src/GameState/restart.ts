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
  const { width, height } = get_canvas_dimensions();

  const corner_positions = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width, y: height }
  ];

  const players = state.players.withMutations(mutable_map => {
    let i = 0;
    mutable_map.forEach((player, uid) => {
      const pos = corner_positions[i % 4];

      const new_player = init_player(uid, player.name, pos, CharacterType.TRIANGLE);
      mutable_map.set(uid, new_player);
      i++;
    });
  });

  return {
    ...initial_state,
    players
  };
}
