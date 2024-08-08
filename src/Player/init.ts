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
import { seconds_to_ticks } from '../Helpers/seconds_to_ticks';

var next_team : TeamType = TeamType.TEAM_RED;

export function init(id: UID, name: Name, pos: V2): Player {


  let initial_player : Player = {
    id,
    name,
    pos,
    target_pos: pos,
    skills: {
      'Q': { id: 'skill1', type: 'melee', cooldown: seconds_to_ticks(1), duration: 1, range: PLAYER_RADIUS * 2 },
      'W': { id: 'skill2', type: 'target', cooldown: seconds_to_ticks(1), duration: 1, range: PLAYER_RADIUS * 2 },
      'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.25), duration: 1, range: 200 },
    },
    active_skills: {},
    life: PLAYER_INITIAL_LIFE,
    team: next_team
  };
  next_team = (next_team == TeamType.TEAM_RED) ? TeamType.TEAM_BLUE : TeamType.TEAM_RED;

  return initial_player;
}
