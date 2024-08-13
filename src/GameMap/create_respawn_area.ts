/// Creates a respawn area for a player.
///
/// # Description
///
/// This function creates a respawn area GameObject based on the player's team.
///
/// # Input
///
/// * `player` - The player for whom to create the respawn area
///
/// # Output
///
/// A GameObject representing the respawn area

import { Player } from '../Player/_';
import { GameObject } from './GameObject/_';
import { TeamType } from '../Team/type';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { PLAYER_RADIUS, TPS } from '../Helpers/consts';

export function create_respawn_area(player: Player): GameObject {
  const { width, height } = get_canvas_dimensions();
  return {
    kind: 'RespawnArea',
    position: player.team === TeamType.TEAM_RED ? { x: 0, y: 0 } : { x: width - PLAYER_RADIUS * 4, y: height - PLAYER_RADIUS * 4 },
    width: PLAYER_RADIUS * 6,
    height: PLAYER_RADIUS * 6,
    active: 3 * TPS // 3 seconds of active time
  };
}
