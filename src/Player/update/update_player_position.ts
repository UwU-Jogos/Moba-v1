/// Updates the player's position based on input and game constraints.
///
/// # Arguments
///
/// * `player` - The player object to update
/// * `dt` - Delta time since the last update
/// * `width` - The width of the game area
/// * `height` - The height of the game area
///
/// # Returns
///
/// A new V2 object representing the updated player position

import { Player } from '../_';
import { V2 } from '../../V2/_';
import { PLAYER_SPEED, PLAYER_RADIUS } from '../../Helpers/consts';
import { create_character } from '../../Character/create_character';

export function update_player_position(player: Player, dt: number, width: number, height: number): V2 {
  const char = create_character(player.character);
  const move_speed_mult = char.effects.find(effect => effect.$ === 'IncreaseMoveSpeed')?.percentage || 0;

  const speed = PLAYER_SPEED + (PLAYER_SPEED * move_speed_mult);

  const dx = ((player.key.D ? speed : 0) + (player.key.A ? -speed : 0)) * dt * 90;
  const dy = ((player.key.S ? speed : 0) + (player.key.W ? -speed : 0)) * dt * 90;

  let new_x = player.pos.x + dx;
  let new_y = player.pos.y + dy;

  new_x = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, new_x));
  new_y = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, new_y));

  return { x: new_x, y: new_y };
}
