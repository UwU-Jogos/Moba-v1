/// Creates a Diamond character.
///
/// # Description
///
/// A diamond char with 25% less life, but can go through walls.
///
/// # Output
///
/// A Character object representing the diamond character

import { Character } from '../_';
import { CharacterType } from '../type';
import { DEFAULT_ATTACK_DAMAGE, DEFAULT_RANGE, DEFAULT_ATTACK_COOLDOWN } from '../../Helpers/consts';

export function Diamond(): Character {
  return {
    name: 'Diamond',
    type: CharacterType.DIAMOND,
    skills: {
      'E': { $: 'Projectile', effects: [], damage: DEFAULT_ATTACK_DAMAGE, speed: 30, range: DEFAULT_RANGE, cooldown: DEFAULT_ATTACK_COOLDOWN },
    },
    effects: [
      { $: 'NoWallCollision', active: true },
    ],
  };
}