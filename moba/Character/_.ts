/// Represents a character in the game.
///
/// # Description
///
/// A character with a name, type, skills, and effects.
///
/// # Fields
///
/// * `name` - The name of the character
/// * `type` - The type of the character (CharacterType)
/// * `skills` - A map of keys to basic skills
/// * `effects` - An array of effects applied to the character
///
/// # Type Definition
///
/// A Character object with the following structure:
/// ```
/// {
///   name: string;
///   type: CharacterType;
///   skills: { [key: Key]: basic };
///   effects: Effect[];
/// }
/// ```

import { CharacterType } from './type';
import { Effect } from '../Effect/_';

export type Character = {
  name: string;
  type: CharacterType;
  skills: { [key: string]: any };
  effects: Effect[];
};
