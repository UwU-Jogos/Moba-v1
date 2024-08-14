/// Updates the player's stats and effects when they destroy an orb.
///
/// # Arguments
/// - players: A map of all players in the game
/// - owner_player: The player who destroyed the orb
/// - projectile: The projectile that destroyed the orb
///
/// # Returns
/// An updated Map of players with the owner player's stats and effects modified

import { Map } from 'immutable';
import { Player } from './_';
import { UID } from '../UID/_';
import { Projectile } from '../Projectile/_';
import { create_character } from '../Character/create_character';

export function update_player_on_orb_destruction(players: Map<UID, Player>, owner_player: Player, projectile: Projectile): Map<UID, Player> {
  const owner_player_character = create_character(owner_player.character);
  const max_life_increase = owner_player_character.effects.find(effect => effect.$ === 'OrbGivesMaxLife')?.life || 0;
  const movement_speed = owner_player_character.effects.find(effect => effect.$ === 'IncreaseMoveSpeed');

  if (movement_speed) {
    movement_speed.percentage += movement_speed.percentage;
  }

  return players.set(projectile.owner_id, {
    ...owner_player,
    stats: {
      ...owner_player.stats,
      destroyed_orbs: owner_player.stats.destroyed_orbs + 1,
      damage_multiplier: owner_player.stats.damage_multiplier + 0.1,
      max_life: owner_player.stats.max_life + max_life_increase,
    }
  });
}
