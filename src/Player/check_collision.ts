/// Checks if a player is colliding with other player.
///
/// # Args
///
/// * `pid` - The unique identifier of the player
/// * `other_player` - The player we are checking collision against. 
/// * `other_pid` - The pid of other player
/// * `pos` - The old position 

import { Player } from './_';
import { UID } from '../UID/_';
import { V2 } from '../V2/_';
import { PLAYER_RADIUS } from '../Helpers/consts';

export function check_collision(pid: UID, other_player: Player, other_pid: UID, pos: V2) : V2 {
  let new_x = pos.x;
  let new_y = pos.y;
  if (pid !== other_pid) {
    const dx = new_x - other_player.pos.x;
    const dy = new_y - other_player.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < PLAYER_RADIUS * 2) {
      const angle = Math.atan2(dy, dx);
      new_x = other_player.pos.x + Math.cos(angle) * PLAYER_RADIUS * 2;
      new_y = other_player.pos.y + Math.sin(angle) * PLAYER_RADIUS * 2;
    }
  }
  return { x: new_x, y: new_y };
}
