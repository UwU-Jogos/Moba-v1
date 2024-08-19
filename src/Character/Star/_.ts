/// Creates a Star character.
///
/// # Description
///
/// +5% move acceleration for each kill
///
/// # Output
///
/// A Character object representing the star character

import { Character } from '../_';
import { CharacterType } from '../type';
import { DEFAULT_RANGE, DEFAULT_ATTACK_DAMAGE, DEFAULT_HEAL_COOLDOWN, DEFAULT_ATTACK_COOLDOWN } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';

export function Star(): Character {
  return {
    name: 'Star',
    type: CharacterType.STAR,
    skills: {
      'E': { $: 'Projectile', effects: [], damage: DEFAULT_ATTACK_DAMAGE, speed: 30, range: DEFAULT_RANGE, cooldown: DEFAULT_ATTACK_COOLDOWN },
      'Q': { $: 'HealArea', effects: [], amount: 10, radius: 10, cooldown: DEFAULT_HEAL_COOLDOWN },
    },
    effects: [
      { $: 'IncreaseMoveSpeed', percentage: 0.05 },
    ],
  };
}
