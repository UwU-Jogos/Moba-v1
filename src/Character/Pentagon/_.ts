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
