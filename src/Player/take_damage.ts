/// Takes damage from players life. 
///
/// # Args
///
/// * `player` - The player object to take life 
/// * `damage` - How much to take 

import { Player } from './_';
import { Damage } from '../Damage/_';

export function take_damage(player: Player, damage: Damage) : Player {
  const updated_life = Math.max(0, player.life - damage);
  return {
    ...player,
    life: updated_life
  };
}
