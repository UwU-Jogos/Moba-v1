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
import { DEFAULT_RANGE, DEFAULT_ATTACK_DAMAGE, DEFAULT_ATTACK_COOLDOWN, DEFAULT_HEAL_COOLDOWN } from '../../Helpers/consts';

export function Triangle(): Character {
  const triangle_range = 1.25 * DEFAULT_RANGE;
  return {
    name: 'Triangle',
    type: CharacterType.TRIANGLE,
    skills: {
      'E': {
        $: 'Projectile', effects: [], damage: DEFAULT_ATTACK_DAMAGE, speed: 30,
        range: triangle_range, cooldown: DEFAULT_ATTACK_COOLDOWN
      },
      'Q': { $: 'HealArea', effects: [], amount: 10, radius: 10, cooldown: DEFAULT_HEAL_COOLDOWN },
    },
    effects: [
      { $: 'NoPlayerCollision', active: true },
    ],
  };
}
