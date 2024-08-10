/// Initializes a new player.
///
/// # Input
///
/// * `id` - The unique identifier for the player
/// * `name` - The name of the player
/// * `pos` - The initial position of the player
///
/// # Output
///
/// A new Player object with initialized properties

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

export function init(id: UID, name: Name, pos: V2, character_type: CharacterType): Player {
  let character = create_character(character_type);
  let stats: Stats = init_stats();
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
    effects: []
  };
  next_team = (next_team == TeamType.TEAM_RED) ? TeamType.TEAM_BLUE : TeamType.TEAM_RED;

  return initial_player;
}
