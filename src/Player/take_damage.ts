/// Applies damage to a player.
///
/// # Input
///
/// * `p` - The player to apply damage to
/// * `d` - The amount of damage to apply
///
/// # Output
///
/// Returns a new Player object with updated life after taking damage

import { Player } from './_';
import { Damage } from '../Damage/_';

export function take_damage(p: Player, d: Damage): Player {
  return {
    ...p,
    life: Math.max(0, p.life - d)
  };
}
