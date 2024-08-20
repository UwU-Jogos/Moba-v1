/// Represents the finished state of the game.
///
/// # Description
///
/// Finished type contains the winner and loser teams, and a draw flag.
///
/// # Fields
///
/// * `winner` - The winning team
/// * `loser` - The losing team
/// * `draw` - A boolean indicating if the game ended in a draw
///
/// # Function: game_finished
///
/// Checks if the game has finished by verifying if all players of a team have no lives left.
/// If there's a Pentagon character, the game finishes if all other players on that team have no lives left.
/// In a 1v1 scenario with a Pentagon character, the game ends immediately.
/// If time is up, the team with more total lives wins.
///
/// # Input
///
/// * `state` - The current game state
/// * `time_up` - A boolean indicating if the time is up
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
  draw: boolean;
};

export function game_finished(state: GameState, time_up: boolean): Finished | null {
  const players = Array.from(state.players.values());
  const pentagon_player = players.find(player => create_character(player.character).type === CharacterType.PENTAGON);

  if (pentagon_player) {
    if (players.length === 2) {
      // 1v1 scenario with Pentagon, game ends immediately
      return {
        winner: pentagon_player.team === TeamType.TEAM_RED ? TeamType.TEAM_BLUE : TeamType.TEAM_RED,
        loser: pentagon_player.team,
        draw: false
      };
    }

    const pentagon_team_players = players.filter(player => player.team === pentagon_player.team && player.id !== pentagon_player.id);
    const pentagon_team_finished = pentagon_team_players.every(player => player.stats.lifes === 0);

    if (pentagon_team_finished) {
      return {
        winner: pentagon_player.team === TeamType.TEAM_RED ? TeamType.TEAM_BLUE : TeamType.TEAM_RED,
        loser: pentagon_player.team,
        draw: false
      };
    }

    if (!time_up) {
      return null; // Game continues if Pentagon's teammates are still alive and time is not up
    }
  }

  const red_team_lives = players
    .filter(player => player.team === TeamType.TEAM_RED)
    .reduce((sum, player) => sum + player.stats.lifes, 0);

  const blue_team_lives = players
    .filter(player => player.team === TeamType.TEAM_BLUE)
    .reduce((sum, player) => sum + player.stats.lifes, 0);

  if (time_up || red_team_lives === 0 || blue_team_lives === 0) {
    if (red_team_lives === blue_team_lives) {
      return {
        winner: TeamType.TEAM_RED, // Arbitrary winner in case of a draw
        loser: TeamType.TEAM_BLUE,
        draw: true
      };
    } else if (red_team_lives > blue_team_lives) {
      return {
        winner: TeamType.TEAM_RED,
        loser: TeamType.TEAM_BLUE,
        draw: false
      };
    } else {
      return {
        winner: TeamType.TEAM_BLUE,
        loser: TeamType.TEAM_RED,
        draw: false
      };
    }
  }

  return null;
}
