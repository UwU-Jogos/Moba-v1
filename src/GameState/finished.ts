/// Represents the finished state of the game.
///
/// # Description
///
/// Finished type contains the winner and loser teams.
///
/// # Fields
///
/// * `winner` - The winning team
/// * `loser` - The losing team
///
/// # Function: game_finished
///
/// Checks if the game has finished by verifying if all players of a team have no lives left.
///
/// # Input
///
/// * `state` - The current game state
///
/// # Output
///
/// Returns a Finished object if the game has ended, or null if it's still ongoing

import { GameState } from './_';
import { TeamType } from '../Team/type';

export type Finished = {
  winner: TeamType;
  loser: TeamType;
};

export function game_finished(state: GameState): Finished | null {
  const redTeamFinished = state.players
    .filter(player => player.team === TeamType.TEAM_RED)
    .every(player => player.stats.lifes === 0);

  const blueTeamFinished = state.players
    .filter(player => player.team === TeamType.TEAM_BLUE)
    .every(player => player.stats.lifes === 0);

  if (redTeamFinished) {
    return {
      winner: TeamType.TEAM_BLUE,
      loser: TeamType.TEAM_RED
    };
  }

  if (blueTeamFinished) {
    return {
      winner: TeamType.TEAM_RED,
      loser: TeamType.TEAM_BLUE
    };
  }

  return null;
}