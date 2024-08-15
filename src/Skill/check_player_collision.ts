import { distance } from '../Helpers/distance';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { Player } from '../Player/_';
import { take_damage } from '../Player/take_damage';
import { UID } from '../UID/_';
import { Skill } from './_';
import { create_character } from '../Character/create_character';
import { CharacterType } from '../Character/type';

export function check_player_collision(skill: Skill, player: Player, player_id: UID): [Player, Skill] {
  if (skill.owner_id === player_id || skill.$ !== 'Projectile') {
    return [player, skill];
  }

  const useless_skill: Skill = {
    ...skill,
    range: 0,
  };

  const dist = distance(skill.pos, player.pos);

  if (dist <= PLAYER_RADIUS) {
    const character_obj = create_character(player.character);
    const immune_effect = player.effects.find(effect => effect.$ === 'Immune' && effect.active > 0);
    const char_immune_effect = character_obj.effects.find(effect => effect.$ === 'Immune' && effect.active > 0);
    const pentagon_player = player.character === CharacterType.PENTAGON;

    if (immune_effect || char_immune_effect || pentagon_player) {
      return [player, useless_skill];
    } else {
      const damage_to_take = skill.damage * player.stats.damage_multiplier;
      const damaged_player = take_damage(player, damage_to_take);
      return [damaged_player, useless_skill];
    }
  }

  return [player, skill];
}
