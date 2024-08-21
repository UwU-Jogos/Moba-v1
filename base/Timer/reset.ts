/// Resets the game timer.
///
/// # Description
///
/// This function resets the remaining time of the timer to the initial game time.
///
/// # Arguments
///
/// * `time` - The current Timer object
///
/// # Returns
///
/// Returns an updated Timer object with the remaining time reset to the initial game time.

import { Timer } from "./_";

export function reset(timer: Timer): Timer {
  return { ...timer, remaining_time: timer.game_time };
}
