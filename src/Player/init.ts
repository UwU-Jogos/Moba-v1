/// Initializes a new player.
///
/// # Arguments
///
/// * `id: UID` - The unique identifier for the player
/// * `name: Name` - The name of the player
/// * `character_type: CharacterType` - The type of character for the player
///
/// # Returns
///
/// * `Player` - A new Player object with initialized properties
///
/// # Description
///
/// This function creates a new player with the given id, name, and character type.
/// It alternates between red and blue teams for each new player created.
/// The initial position is set based on the team.
/// Character-specific adjustments (e.g., for DIAMOND type) are applied to stats.
/// The function initializes various player properties including skills, life, team, and effects.
/// It also sets up the player's initial stats, position, and character-specific attributes.

import { Player } from './_';
import { UID } from '../UID/_';
import { Name } from '../Name/_';
import { V2 } from '../V2/_';
import { TeamType } from '../Team/type';
import { PLAYER_INITIAL_LIFE } from '../Helpers/consts';
import { basic } from '../Skill/basic';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { CharacterType } from '../Character/type';
import { seconds_to_ticks } from '../Helpers/seconds_to_ticks';
import { create_character } from '../Character/create_character';
import { init_stats } from '../Stats/init_stats';
import { Stats } from '../Stats/_';

var next_team : TeamType = TeamType.TEAM_RED;

export function init(id: UID, name: Name, character_type: CharacterType): Player {
  const blue_team_spawn = { x: 400, y: 550 };
  const red_team_spawn = { x: 400, y: 50 };

  const pos = next_team == TeamType.TEAM_RED ? red_team_spawn : blue_team_spawn;

  let character = create_character(character_type);
  let stats: Stats = init_stats();
  
  // TODO: REFACTOR
  if (character_type === CharacterType.DIAMOND) {
    stats.max_life *= 0.75;
  }

  let initial_player : Player = {
    id,
    name,
    pos,
    target_pos: pos,
    skills: character.skills,
    active_skills: {},
    life: stats.max_life,
    team: next_team,
    character: character_type,
    key: {},
    stats,
    effects: [],
    shots: 0
  };
  next_team = (next_team == TeamType.TEAM_RED) ? TeamType.TEAM_BLUE : TeamType.TEAM_RED;

  return initial_player;
}