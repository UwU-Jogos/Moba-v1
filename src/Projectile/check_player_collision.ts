import { distance } from '../Helpers/distance';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { Player } from '../Player/_';
import { take_damage } from '../Player/take_damage';
import { UID } from '../UID/_';
import { Projectile } from './_';
import { create_character } from '../Character/create_character';
import { CharacterType } from '../Character/type';

export function check_player_collision(projectile: Projectile, player: Player, player_id: UID): [Player, Projectile] {
  if (projectile.owner_id === player_id) {
    return [player, projectile];
  }

  const useless_projectile: Projectile = {
      ...projectile,
      remaining_distance: 0,
      remaining_duration: 0,
    };


  const dist = distance(projectile.pos, player.pos);

  if (dist <= PLAYER_RADIUS) {
    const character_obj = create_character(player.character);
    const immune_effect = player.effects.find(effect => effect.$ === 'Immune' && effect.active > 0);
    const char_immune_effect = character_obj.effects.find(effect => effect.$ === 'Immune' && effect.active > 0);
    const pentagon_player = player.character == CharacterType.PENTAGON;
    
    if (immune_effect || char_immune_effect || pentagon_player) {
      return [player, useless_projectile];
    } else {
      const damage_to_take = projectile.damage * player.stats.damage_multiplier;
      const damaged_player = take_damage(player, damage_to_take);
      return [damaged_player, useless_projectile];
    }
  }

  return [player, projectile];
}
