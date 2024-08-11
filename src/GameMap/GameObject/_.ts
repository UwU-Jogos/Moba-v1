/// Represents a game object in the game world.
///
/// # Constructors
///
/// * `Wall` - A wall object with position, width, and height.
/// * `Platform` - A platform object with position, width, and height.
/// * `PushWall` - A wall that pushes the player in the opposite direction when hit.
/// * `RespawnArea` - An area where players can respawn, with activation state and duration.
/// * `Orb` - An orb object with position, radius, and active state, as well as life
///
/// # Fields
///

import { V2 } from '../../V2/_';

export type GameObject =
  | { kind: 'Wall', position: V2, width: number, height: number }
  | { kind: 'Platform', position: V2, width: number, height: number }
  | { kind: 'PushWall', position: V2, width: number, height: number, force: number }
  | { kind: 'RespawnArea', position: V2, width: number, height: number, active: number }
  | { kind: 'Orb', position: V2, radius: number, life: number, active: number };
