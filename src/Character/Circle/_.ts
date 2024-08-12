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
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';
import { Effect } from '../../Effect/_';

export function Circle(): Character {
  return {
    name: 'Circle',
    type: CharacterType.CIRCLE,
    skills: {
      'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.15), duration: 1, range: DEFAULT_RANGE },
    },
    effects: [
      { $: 'OrbGivesMaxLife', life: 35 },
    ]
  };
}
