/// Checks if a player is dead.
///
/// # Input
///
/// * `player` - The player to check
///
/// # Output
///
/// Returns true if the player's life is 0 or less, false otherwise
import { Player } from './_';

export function is_dead(player: Player): boolean {
  return player.life <= 0;
}
