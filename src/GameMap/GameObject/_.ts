/// Represents a game object in the game world.
///
/// # Constructors
///
/// * `Wall` - A wall object with position, width, and height.
/// * `Platform` - A platform object with position, width, and height.
/// * `PushWall` - A wall that pushes the player in the opposite direction when hit.
///
/// # Fields
///
/// * `position` - The position of the object as a V2 (vector with x and y coordinates).
/// * `width` - The width of the object.
/// * `height` - The height of the object.
/// * `pushForce` - The force with which a PushWall pushes the player (only for PushWall).

import { V2 } from '../../V2/_';

export type GameObject =
  | { kind: 'Wall', position: V2, width: number, height: number }
  | { kind: 'Platform', position: V2, width: number, height: number }
  | { kind: 'PushWall', position: V2, width: number, height: number, force: number };
