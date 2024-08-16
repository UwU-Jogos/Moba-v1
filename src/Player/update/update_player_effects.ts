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
/// 1. Decrementing the 'active' counter for 'Immune' effects
/// 2. Removing any 'Immune' effects that have expired (active <= 0)
/// 3. Keeping all other effects unchanged

import { Player } from '../_';

export function update_player_effects(player: Player): Player {
  const updated_effects = player.effects.map(effect => {
    if (effect.$ === 'Immune' && effect.active > 0) {
      return { ...effect, active: effect.active - 1 };
    }
    return effect;
  }).filter(effect => effect.$ !== 'Immune' || effect.active > 0);

  return {
    ...player,
    effects: updated_effects,
  };
}
