/// Updates the effects on a player.
///
/// # Arguments
///
/// * `player: Player` - The player whose effects are to be updated
///
/// # Returns
///
/// * `Player` - A new Player object with updated effects
///
/// # Description
///
/// This function updates the player's effects by:
/// 1. Decrementing the 'active' counter for 'Immune' and 'OrbDamageBuff' effects
/// 2. Removing any 'Immune' or 'OrbDamageBuff' effects that have expired (active <= 0)
/// 3. Keeping all other effects unchanged
/// 4. Setting damage multiplier to 1 if no active OrbDamageBuff effects remain

import { Player } from '../_';

export function update_player_effects(player: Player): Player {
  const updated_effects = player.effects.map(effect => {
    switch (effect.$) {
      case "Immune":
      case "OrbDamageBuff": {
        return { ...effect, active: effect.active - 1 };
      }
      default: {
        return effect;
      }
    }
  }).filter(effect => {
    switch (effect.$) {
      case "Immune":
      case "OrbDamageBuff": {
        return effect.active > 0;
      }
      default: {
        return true;
      }
    }
  });

  const has_active_orb_damage_buff = updated_effects.some(effect => effect.$ === "OrbDamageBuff");

  return {
    ...player,
    effects: updated_effects,
    stats: {
      ...player.stats,
      damage_multiplier: has_active_orb_damage_buff ? player.stats.damage_multiplier : 1,
    }
  };
}
