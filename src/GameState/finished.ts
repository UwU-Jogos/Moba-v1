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
/// If there's a Pentagon character, the game finishes if all other players on that team have no lives left.
/// In a 1v1 scenario with a Pentagon character, the game ends immediately.
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
import { create_character } from '../Character/create_character';
import { CharacterType } from '../Character/type';

export type Finished = {
  winner: TeamType;
  loser: TeamType;
};

export function game_finished(state: GameState): Finished | null {
  const players = Array.from(state.players.values());
  const pentagonPlayer = players.find(player => create_character(player.character).type === CharacterType.PENTAGON);

  if (pentagonPlayer) {
    if (players.length === 2) {
      // 1v1 scenario with Pentagon, game ends immediately
      return {
        winner: pentagonPlayer.team === TeamType.TEAM_RED ? TeamType.TEAM_BLUE : TeamType.TEAM_RED,
        loser: pentagonPlayer.team
      };
    }

    const pentagonTeamPlayers = players.filter(player => player.team === pentagonPlayer.team && player.id !== pentagonPlayer.id);
    const pentagonTeamFinished = pentagonTeamPlayers.every(player => player.stats.lifes === 0);

    if (pentagonTeamFinished) {
      return {
        winner: pentagonPlayer.team === TeamType.TEAM_RED ? TeamType.TEAM_BLUE : TeamType.TEAM_RED,
        loser: pentagonPlayer.team
      };
    }

    return null; // Game continues if Pentagon's teammates are still alive
  }

  const redTeamFinished = players
    .filter(player => player.team === TeamType.TEAM_RED)
    .every(player => player.stats.lifes === 0);

  const blueTeamFinished = players
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
