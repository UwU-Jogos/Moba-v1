/// Determines if a projectile should be removed from the game.
///
/// # Description
///
/// This function checks if a projectile has expired or reached its destination,
/// indicating whether it should be removed from the game.
///
/// # Args
///
/// * `projectile` - The projectile to check
///
/// # Returns
///
/// A boolean value:
/// * `true` if the projectile should be removed
/// * `false` if the projectile should remain in the game

import { Projectile } from "./_";

export function should_remove_projectile(projectile: Projectile): boolean {
  return (
    projectile.remaining_duration <= 0 ||
    (projectile.skill_type === "action" && projectile.remaining_distance <= 0)
  );
}
