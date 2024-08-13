/// Respawns a player to a corner of the map.
///
/// # Arguments
///
/// - `player: Player` - The player object to respawn
///
/// # Returns
///
/// - `Player` - A new Player object with:
///   - Updated position (set to a corner based on team)
///   - Reset life to maximum
///   - Decremented life count
///   - Added temporary immunity effect

import { Player } from './_';
import { V2 } from '../V2/_';
import { TeamType } from '../Team/type';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { TPS } from '../Helpers/consts';

export function respawn(player: Player): Player {
  const { width, height } = get_canvas_dimensions();

  const corners: V2[] = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width, y: height }
  ];

  const cornerIndex = player.team === TeamType.TEAM_RED ? 0 : 3;
  const respawnCorner = corners[cornerIndex];

  return {
    ...player,
    pos: respawnCorner,
    target_pos: respawnCorner,
    life: player.stats.max_life,
    stats: {
      ...player.stats,
      lifes: player.stats.lifes - 1
    },
    effects: [
      ...player.effects,
      { $: 'Immune', active: 5 * TPS }
    ]
  };
}