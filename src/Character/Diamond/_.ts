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
import { DEFAULT_RANGE } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';
import { Effect } from '../../Effect/_';

export function Diamond(): Character {
  return {
    name: 'Diamond',
    type: CharacterType.DIAMOND,
    skills: {
      'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.15), duration: 1, range: DEFAULT_RANGE },
    },
    effects: [
      { $: 'NoWallCollision', active: true },
    ],
  };
}
