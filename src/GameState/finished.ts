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
  const redTeamPlayers = state.players.filter(player => player.team === TeamType.TEAM_RED);
  const blueTeamPlayers = state.players.filter(player => player.team === TeamType.TEAM_BLUE);

  const redTeamFinished = redTeamPlayers.every(player => player.stats.lifes === 0);
  const blueTeamFinished = blueTeamPlayers.every(player => player.stats.lifes === 0);

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

  // Desempate por vidas restantes
  const redTeamLives = redTeamPlayers.reduce((sum, player) => sum + player.stats.lifes, 0);
  const blueTeamLives = blueTeamPlayers.reduce((sum, player) => sum + player.stats.lifes, 0);

  if (redTeamLives > blueTeamLives) {
    return {
      winner: TeamType.TEAM_RED,
      loser: TeamType.TEAM_BLUE
    };
  } else if (blueTeamLives > redTeamLives) {
    return {
      winner: TeamType.TEAM_BLUE,
      loser: TeamType.TEAM_RED
    };
  }

  return null;
}
