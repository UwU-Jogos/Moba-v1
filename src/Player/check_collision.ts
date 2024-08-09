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
import { PLAYER_SQUARE_SIZE } from '../Helpers/consts';

export function check_collision(pid: UID, other_player: Player, other_pid: UID, pos: V2) : V2 {
  let new_x = pos.x;
  let new_y = pos.y;
  if (pid !== other_pid && other_player.life > 0) {
    const dx = new_x - other_player.pos.x;
    const dy = new_y - other_player.pos.y;
    if (Math.abs(dx) < PLAYER_SQUARE_SIZE && Math.abs(dy) < PLAYER_SQUARE_SIZE) {
      if (Math.abs(dx) > Math.abs(dy)) {
        new_x = other_player.pos.x + Math.sign(dx) * PLAYER_SQUARE_SIZE;
      } else {
        new_y = other_player.pos.y + Math.sign(dy) * PLAYER_SQUARE_SIZE;
      }
    }
  }
  return { x: new_x, y: new_y };
}
