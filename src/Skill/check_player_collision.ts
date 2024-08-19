import { distance } from '../Helpers/distance';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { Player } from '../Player/_';
import { take_damage } from '../Player/take_damage';
import { UID } from '../UID/_';
import { Skill } from './_';
import { match } from './match';
import { create_character } from '../Character/create_character';
import { CharacterType } from '../Character/type';

export function check_player_collision(skill: Skill, player: Player, player_id: UID): [Player, Skill] {
  const dist = distance(skill.pos, player.pos);

  if (dist <= PLAYER_RADIUS) {
    return match(skill, {
      Projectile: () => projectile_collision(skill, player),
      HealArea: () => heal_collision(skill, player),
    });
  }

  return [player, skill];
}

function heal_collision(skill: Skill, player: Player): [Player, Skill] {
  if (skill.$ !== 'HealArea') { return [player, skill]; }

  const useless_heal: Skill = {
    ...skill,
    radius: 0
  };

  const life_healed = player.life + skill.amount;
  const healed_player = {
    ...player,
    life: (life_healed <= player.stats.max_life ? life_healed : player.stats.max_life), 
  };
  return [healed_player, useless_heal];
}

function projectile_collision(skill: Skill, player: Player): [Player, Skill] {
  if (skill.$ !== 'Projectile' || player.id === skill.owner_id) { return [player, skill]; }
  const useless_projectile: Skill = {
    ...skill,
    range: 0,
  };

  const character_obj = create_character(player.character);
  const immune_effect = player.effects.find(effect => effect.$ === 'Immune' && effect.active > 0);
  const char_immune_effect = character_obj.effects.find(effect => effect.$ === 'Immune' && effect.active > 0);
  const pentagon_player = player.character === CharacterType.PENTAGON;

  if (immune_effect || char_immune_effect || pentagon_player) {
    return [player, useless_projectile];
  } else {
    const damage_to_take = skill.damage * player.stats.damage_multiplier;
    const damaged_player = take_damage(player, damage_to_take);
    return [damaged_player, useless_projectile];
  }
}
