/// Updates the player's stats and effects when they destroy an orb.
///
/// # Arguments
/// - players: A map of all players in the game
/// - owner_player: The player who destroyed the orb
/// - skill: The skill that destroyed the orb
///
/// # Returns
/// An updated Map of players with the owner player's stats and effects modified

import { Map } from 'immutable';
import { Player } from './_';
import { UID } from '../Types/UID/_';
import { Skill } from '../Skill/_';
import { GameObject } from '../GameMap/GameObject/_';
import { Effect } from '../Types/Effect/_';
import { create_character } from '../Character/create_character';
import { apply_effects as apply_orb_effects } from '../GameMap/GameObject/Orb/apply_effects';

export function update_player_on_orb_destruction(players: Map<UID, Player>, owner_player: Player, skill: Skill, orb: GameObject & { kind: 'Orb' }): Map<UID, Player> {
  const updated_player : Player = apply_orb_effects(owner_player, orb);

  const owner_player_character = create_character(updated_player.character);
  const max_life_increase = owner_player_character.effects.find(effect => effect.$ === 'OrbGivesMaxLife')?.life || 0;
  const movement_speed = owner_player_character.effects.find(effect => effect.$ === 'IncreaseMoveSpeed');

  const damage_buff = updated_player.effects.find(effect => effect.$ === 'OrbDamageBuff' && effect.active > 0);

  if (movement_speed) {
    movement_speed.percentage += movement_speed.percentage;
  }

  const new_dmg_multiplier = (damage_buff && damage_buff.$ === 'OrbDamageBuff') ? (1 + (damage_buff.percentage / 100)) : 1

  return players.set(skill.owner_id, {
    ...updated_player,
    stats: {
      ...updated_player.stats,
      destroyed_orbs: updated_player.stats.destroyed_orbs + 1,
      damage_multiplier: new_dmg_multiplier,
      max_life: updated_player.stats.max_life + max_life_increase,
    }
  });
}
