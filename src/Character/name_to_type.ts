/// Converts a character name to its corresponding CharacterType.
///
/// # Description
///
/// This function takes a character name as input and returns the corresponding
/// CharacterType. If the character name is not recognized, it throws an error.
///
/// # Input
///
/// * `name` - The name of the character (string)
///
/// # Output
///
/// The corresponding CharacterType for the given character name
///
/// # Throws
///
/// Throws an Error if the character name is not recognized

import { CharacterType } from './type';

export function name_to_type(name: string): CharacterType {
  switch (name) {
    case 'Triangle':
      return CharacterType.TRIANGLE;
    default:
      throw new Error(`Unknown character name: ${name}`);
  }
}
