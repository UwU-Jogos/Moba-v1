/// Represents various effects in the game.
///
/// # Description
///
/// Effect is a union type with different constructors for various game effects.
///
/// # Constructors
///
/// * `RangeAlter` - Alters the range of an ability or attack
///   - `multiplier` - The multiplier to apply to the range
///
/// * `NoPlayerCollision` - Determines if an entity can pass through players
///   - `active` - Whether the effect is active (true) or not (false)
///
/// * `NoWallCollision` - Determines if an entity can pass through walls
///   - `active` - Whether the effect is active (true) or not (false)
///
/// * `Immune` - Determines if an entity is immune to damage
///   - `active` - Whether the effect is active (true) or not (false)
///
/// * `MultipleShot` - Allows an entity to fire multiple shots
///   - `shots_number` - The number of shots to fire
///
/// * `OrbGivesMaxLife` - Gives maximum life when collecting an orb
///   - `life` - The amount of life to give
///
/// * `IncreaseMoveSpeed` - Gives move speed
///   - `percentage` - percentage of move speed increase
///
/// * `ShotThroughWall` - Allows shots to pass through walls
///   - `active` - Whether the effect is active (true) or not (false)

export type Effect =
  | { $: 'RangeAlter'; multiplier: number }
  | { $: 'NoPlayerCollision'; active: boolean }
  | { $: 'NoWallCollision'; active: boolean }
  | { $: 'Immune'; active: number }
  | { $: 'MultipleShot'; shots_number: number }
  | { $: 'OrbGivesMaxLife'; life: number }
  | { $: 'IncreaseMoveSpeed'; percentage: number }
  | { $: 'ShotThroughWall'; active: boolean };
