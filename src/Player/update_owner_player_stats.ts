/// Updates the stats of the player who destroyed an orb.
///
/// # Arguments
///
/// * `owner_player` - The Player object representing the player who destroyed the orb
///
/// # Returns
///
/// A new Player object with updated stats:
/// - Increments the destroyed_orbs count
/// - Increases the damage_multiplier by 0.1
/// - Increases the max_life based on the OrbGivesMaxLife effect (if present)
/// - Doubles the IncreaseMoveSpeed effect percentage (if present)

import { Player } from './_';
import { create_character } from '../Character/create_character';

export function update_owner_player_stats(owner_player: Player): Player {
  const owner_player_character = create_character(owner_player.character);
  const max_life_increase = owner_player_character.effects.find(effect => effect.$ === 'OrbGivesMaxLife')?.life || 0;
  const movement_speed = owner_player_character.effects.find(effect => effect.$ === 'IncreaseMoveSpeed');

  if (movement_speed) {
    movement_speed.percentage += movement_speed.percentage;
  }

  return {
    ...owner_player,
    stats: {
      ...owner_player.stats,
      destroyed_orbs: owner_player.stats.destroyed_orbs + 1,
      damage_multiplier: owner_player.stats.damage_multiplier + 0.1,
      max_life: owner_player.stats.max_life + max_life_increase,
    }
  };
}