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
import { DEFAULT_RANGE } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';

export function Triangle(): Character {
  const triangle_range = 1.25 * DEFAULT_RANGE;
  return {
    name: 'Triangle',
    type: CharacterType.TRIANGLE,
    skills: {
      'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.15), duration: 1, range: triangle_range },
    },
    effects: [
      { $: 'NoPlayerCollision', active: true },
    ],
  };
}
