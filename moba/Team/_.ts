/// Represents a team in the game.
///
/// # Description
///
/// A team consists of a TeamType and an array of player UIDs.
///
/// # Fields
///
/// * `type` - The type of the team (TeamType)
/// * `players` - An array of player UIDs, with a maximum length of MAX_PLAYERS

import { TeamType } from './type';
import { UID } from '../UID/_';
import { PLAYERS_LIMIT } from '../Helpers/consts';

export type Team = {
  type: TeamType;
  players: UID[];
};

export function create_team(type: TeamType): Team {
  return {
    type,
    players: [],
  };
}

export function add_player_to_team(team: Team, pid: UID): Team {
  if (team.players.length >= PLAYERS_LIMIT) {
    return team; // Team is full, don't add the player
  }
  return {
    ...team,
    players: [...team.players, pid],
  };
}
