/// Updates the effects on a player.
///
/// # Description
///
/// This function processes each effect on a player, updating durations and removing expired effects.
///
/// # Input
///
/// * `effects` - An array of Effect objects currently applied to the player
///
/// # Output
///
/// Returns an updated array of Effect objects, with expired effects removed and durations updated

import { Effect } from '../Effect/_';

export function update_player_effects(effects: Effect[]): Effect[] {
  return effects.map(effect => {
    if (effect.$ === 'Immune' && effect.active > 0) {
      return { ...effect, active: effect.active - 1 };
    }
    return effect;
  }).filter(effect => effect.$ !== 'Immune' || effect.active > 0);
}
