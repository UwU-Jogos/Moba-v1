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
  const pentagon_player = players.find(player => create_character(player.character).type === CharacterType.PENTAGON);

  if (pentagon_player) {
    if (players.length === 2) {
      // 1v1 scenario with Pentagon, game ends immediately
      return {
        winner: pentagon_player.team === TeamType.TEAM_RED ? TeamType.TEAM_BLUE : TeamType.TEAM_RED,
        loser: pentagon_player.team
      };
    }

    const pentagon_team_players = players.filter(player => player.team === pentagon_player.team && player.id !== pentagon_player.id);
    const pentagon_team_finished = pentagon_team_players.every(player => player.stats.lifes === 0);

    if (pentagon_team_finished) {
      return {
        winner: pentagon_player.team === TeamType.TEAM_RED ? TeamType.TEAM_BLUE : TeamType.TEAM_RED,
        loser: pentagon_player.team
      };
    }

    return null; // Game continues if Pentagon's teammates are still alive
  }

  const red_team_finished = players
    .filter(player => player.team === TeamType.TEAM_RED)
    .every(player => player.stats.lifes === 0);

  const blue_team_finished = players
    .filter(player => player.team === TeamType.TEAM_BLUE)
    .every(player => player.stats.lifes === 0);

  if (red_team_finished) {
    return {
      winner: TeamType.TEAM_BLUE,
      loser: TeamType.TEAM_RED
    };
  }

  if (blue_team_finished) {
    return {
      winner: TeamType.TEAM_RED,
      loser: TeamType.TEAM_BLUE
    };
  }

  return null;
}
