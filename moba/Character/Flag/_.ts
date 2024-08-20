/// Creates a Flag character.
///
/// # Description
///
/// A flag char with 50% less projectile range, but double shot
///
/// # Output
///
/// A Character object representing the flag character

import { Character } from '../_';
import { CharacterType } from '../type';
import { DEFAULT_RANGE, DEFAULT_ATTACK_DAMAGE, DEFAULT_ATTACK_COOLDOWN } from '../../Helpers/consts';

export function Flag(): Character {
  const flag_range = 0.5 * DEFAULT_RANGE;
  return {
    name: 'Flag',
    type: CharacterType.FLAG,
    skills: {
      'E': { $: 'Projectile', effects: [], damage: DEFAULT_ATTACK_DAMAGE, speed: 30, range: flag_range, cooldown: DEFAULT_ATTACK_COOLDOWN },
    },
    effects: [
      { $: 'MultipleShot', shots_number: 2 },
    ],
  };
}
