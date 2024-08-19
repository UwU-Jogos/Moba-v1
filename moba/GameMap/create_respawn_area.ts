/// Creates a respawn area for a team.
///
/// # Description
///
/// This function creates a respawn area GameObject based on the team type.
///
/// # Parameters
///
/// * `team` - The team for which to create the respawn area
/// * `width` - The width of the game map
/// * `height` - The height of the game map
///
/// # Returns
///
/// A GameObject representing the respawn area

import { TeamType } from '../Team/type';
import { GameObject } from './GameObject/_';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { seconds_to_ticks } from '../Helpers/seconds_to_ticks';

export function create_respawn_area(team: TeamType, width: number, height: number): GameObject {
  return {
    kind: 'RespawnArea',
    position: team === TeamType.TEAM_RED ? { x: 0, y: 0 } : { x: width - PLAYER_RADIUS * 4, y: height - PLAYER_RADIUS * 4 },
    width: PLAYER_RADIUS * 6,
    height: PLAYER_RADIUS * 6,
    active: seconds_to_ticks(3) // 3 seconds of active time
  };
}
