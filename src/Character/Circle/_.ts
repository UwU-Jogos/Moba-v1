/// Defines the Circle character.
///
/// # Input
///
/// * `name` - The name of the character
///
/// # Output
///
/// A Character object representing the Circle character

import { Character } from '../_';
import { CharacterType } from '../type';
import { DEFAULT_RANGE } from '../../Helpers/consts';
import { DEFAULT_ATTACK_DAMAGE, DEFAULT_ATTACK_COOLDOWN } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';

export function Circle(): Character {
  return {
    name: 'Circle',
    type: CharacterType.CIRCLE,
    skills: {
      'E': { $: 'Projectile', effects: [], damage: DEFAULT_ATTACK_DAMAGE, speed: 30, range: DEFAULT_RANGE, cooldown: DEFAULT_ATTACK_COOLDOWN },
    },
    effects: [
      { $: 'OrbGivesMaxLife', life: 35 },
    ]
  };
}
