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
import { DEFAULT_RANGE } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';

export function Flag(): Character {
  const flag_range = 0.5 * DEFAULT_RANGE;
  return {
    name: 'Flag',
    type: CharacterType.FLAG,
    skills: {
      'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.15), duration: 1, range: flag_range },
    },
    effects: [
      { $: 'MultipleShot', shots_number: 2 },
    ],
  };
}
