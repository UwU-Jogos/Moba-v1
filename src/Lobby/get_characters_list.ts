/// Gets a list of available character names.
///
/// # Description
///
/// This function reads the contents of the Character directory and returns an array
/// of character names based on the subdirectories present.
///
/// # Output
///
/// An array of strings representing the available character names.

import { Character } from '../Character/_';

export function get_characters_list(): string[] {
  // In a browser environment, we can't directly read the file system.
  // Instead, we'll return a hardcoded list based on the known Character subdirectories.
  
  // This list should be manually updated when new characters are added.
  return ['Triangle'];
}
