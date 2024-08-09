/// Represents a character in the game.
///
/// # Description
///
/// A character with a name, type, and skills.
///
/// # Input
///
/// * `name` - The name of the character
/// * `type` - The type of the character (CharacterType)
///
/// # Output
///
/// A Character object

import { CharacterType } from './type';
import { Key } from '../Key/_';
import { DEFAULT_RANGE } from '../Helpers/consts';
import { basic } from '../Skill/basic';

export type Character = {
  name: string;
  type: CharacterType;
  skills: { [key: Key]: basic };
};

