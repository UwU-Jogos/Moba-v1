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
import { create_character } from '../Character/create_character';
import { CharacterType } from '../Character/type';

export function check_collision(player: Player, pid: UID, other_player: Player, other_pid: UID, pos: V2) : V2 {
  if (pid === other_pid) { return pos; }

  const player_character = create_character(player.character);
  const other_character = create_character(other_player.character);

  const no_collision_player = player_character.effects.some(effect => effect.$ === 'NoPlayerCollision');
  const no_collision_other_player = other_character.effects.some(effect => effect.$ === 'NoPlayerCollision');

  if (no_collision_player || no_collision_other_player) {
    return pos;
  }

  let new_x = pos.x;
  let new_y = pos.y;
  if (pid !== other_pid && other_player.life > 0) {
    const dx = new_x - other_player.pos.x;
    const dy = new_y - other_player.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < PLAYER_RADIUS * 2) {
      const angle = Math.atan2(dy, dx);
      const push_factor = player.character === CharacterType.PENTAGON ? 0.9 : 1;
      new_x = other_player.pos.x + Math.cos(angle) * PLAYER_RADIUS * 2 * push_factor;
      new_y = other_player.pos.y + Math.sin(angle) * PLAYER_RADIUS * 2 * push_factor;
    }
  }
  return { x: new_x, y: new_y };
}
