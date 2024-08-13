/// Updates the effects on a player.
///
/// Processes each effect on a player, updating durations and removing expired effects.
/// Currently, it only handles the 'Immune' effect, decreasing its active duration by 1 each update.
///
/// # Arguments
/// - effects: An array of Effect objects currently applied to the player
///
/// # Returns
/// An updated array of Effect objects, with expired 'Immune' effects removed and their durations updated.
/// Other effect types are left unchanged.

import { Effect } from '../Effect/_';

export function update_player_effects(effects: Effect[]): Effect[] {
  return effects.map(effect => {
    if (effect.$ === 'Immune' && effect.active > 0) {
      return { ...effect, active: effect.active - 1 };
    }
    return effect;
  }).filter(effect => effect.$ !== 'Immune' || effect.active > 0);
}