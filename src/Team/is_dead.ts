/// Checks if any player of a specific team is dead.
///
/// # Input
///
/// * `state` - The current game state
/// * `team_type` - The team type to check
///
/// # Output
///
/// Returns a list of players from the specified team that are dead (life <= 0)

import { GameState } from '../GameState/_';
import { TeamType } from './type';
import { Player } from '../Player/_';
import { PLAYERS_LIMIT } from '../Helpers/consts';

export function is_dead(state: GameState, team_type: TeamType): boolean {
  const result = state.players.filter(player => 
    player.team === team_type && player.life <= 0
  ).toArray().length == (PLAYERS_LIMIT / 2);
  return result;
}
