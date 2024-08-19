/// Takes damage from player's life.
///
/// # Arguments
/// - player: The player object to take damage from
/// - damage: The amount of damage to apply
///
/// # Returns
/// A new Player object with updated life

import { Player } from './_';

export function take_damage(player: Player, damage: number) : Player {
  const updated_life = Math.max(0, player.life - damage);
  return {
    ...player,
    life: updated_life,
  };
}