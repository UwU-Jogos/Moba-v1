/// Updates the game timer.
///
/// # Description
///
/// This function updates the remaining time and displays it on the screen.
///
/// # Arguments
///
/// * `time` - The current Time object
/// * `current_time` - The current game time in seconds
///
/// # Returns
///
/// Returns an updated Time object with the new remaining time.
///
/// # Side Effects
///
/// Updates the text content of the time display element.

import { Timer } from "./_";

export function update(timer: Timer, current_time: number): Timer {
  const remaining_time = Math.max(0, timer.game_time - Math.floor(current_time));
  const minutes = Math.floor(remaining_time / 60);
  const seconds = Math.floor(remaining_time % 60);
  timer.time_display.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return { ...timer, remaining_time };
}
