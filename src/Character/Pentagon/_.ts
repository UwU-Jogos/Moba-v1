/// Creates a Pentagon character.
///
/// # Description
///
/// Immortal, but does not attack
///
/// # Output
///
/// A Character object representing the pentagon character

import { Character } from '../_';
import { CharacterType } from '../type';
import { DEFAULT_RANGE } from '../../Helpers/consts';
import { seconds_to_ticks } from '../../Helpers/seconds_to_ticks';
import { Effect } from '../../Effect/_';

export function Pentagon(): Character {
  return {
    name: 'Pentagon',
    type: CharacterType.PENTAGON,
    skills: {},
    effects: [
      { $: 'Immune', active: 1000000000000 },
    ],
  };
}
