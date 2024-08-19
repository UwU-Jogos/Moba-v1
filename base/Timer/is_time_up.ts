/// Checks if the game time is up.
///
/// # Description
///
/// This function determines whether the game time has expired.
///
/// # Arguments
///
/// * `timer` - The current Timer object
///
/// # Returns
///
/// Returns a boolean value:
/// * `true` if the remaining time is less than or equal to 0
/// * `false` otherwise

import { Timer } from "./_";

export function is_time_up(timer: Timer): boolean {
  return timer.remaining_time <= 0;
}
