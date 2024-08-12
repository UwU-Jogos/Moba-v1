/// Creates a character based on the given character type.
///
/// # Input
///
/// * `characterType` - The type of character to create (CharacterType)
///
/// # Output
///
/// A Character object representing the created character

import { Character } from './_';
import { CharacterType } from './type';
import { Triangle } from './Triangle/_';
import { Circle } from './Circle/_';

export function create_character(characterType: CharacterType): Character {
  switch (characterType) {
    case CharacterType.TRIANGLE:
      return Triangle();
    case CharacterType.CIRCLE:
      return Circle();
    default:
      throw new Error(`Unsupported character type: ${characterType}`);
  }
}
