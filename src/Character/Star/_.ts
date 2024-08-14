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
import { DEFAULT_RANGE } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';

export function Star(): Character {
  return {
    name: 'Star',
    type: CharacterType.STAR,
    skills: {
      'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.15), duration: 1, range: DEFAULT_RANGE },
    },
    effects: [
      { $: 'IncreaseMoveSpeed', percentage: 0.05 },
    ],
  };
}
