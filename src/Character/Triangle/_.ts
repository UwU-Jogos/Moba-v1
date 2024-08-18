/// Creates a Triangle character.
///
/// # Description
///
/// A triangle char with projectiles 25% faster and no collision with other players.
///
/// # Output
///
/// A Character object representing the triangle character

import { Character } from '../_';
import { CharacterType } from '../type';
import { DEFAULT_RANGE, DEFAULT_ATTACK_DAMAGE } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';
import { SkillType } from '../../Skill/_';

export function Triangle(): Character {
  const triangle_range = 1.25 * DEFAULT_RANGE;
  return {
    name: 'Triangle',
    type: CharacterType.TRIANGLE,
    skills: {
      'E': { $: 'Projectile', effects: [], damage: DEFAULT_ATTACK_DAMAGE, speed: 30, range: triangle_range },
      'Q': { $: 'HealArea', effects: [], amount: 10, radius: 10 },
    },
    effects: [
      { $: 'NoPlayerCollision', active: true },
    ],
  };
}
