/// Populates the character select dropdown with available characters.
///
/// # Description
///
/// This function populates the character select dropdown in the HTML with
/// the list of available characters obtained from `get_characters_list()`.
///
/// # Side Effects
///
/// - Modifies the DOM by updating the 'character-select' element.
/// - Logs an error to the console if the 'character-select' element is not found.
///
/// # Throws
///
/// This function doesn't throw any errors, but logs to console if there's an issue.

import { get_characters_list } from './get_characters_list';

export function populate_character_select(): void {
  const character_select = document.getElementById('character-select') as HTMLSelectElement;
  if (character_select) {
    character_select.innerHTML = ''; // Clear existing options
    const characters = get_characters_list();
    characters.forEach(character => {
      const option = document.createElement('option');
      option.value = character;
      option.textContent = character;
      character_select.appendChild(option);
    });
  } else {
    console.error("Character select not found!");
  }
}
