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

export type Effect =
  | { $: 'RangeAlter'; multiplier: number }
  | { $: 'NoPlayerCollision'; active: boolean }
  | { $: 'NoWallCollision'; active: boolean };