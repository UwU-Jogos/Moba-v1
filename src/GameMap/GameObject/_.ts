/// Represents a game object in the game world.
///
/// # Constructors
///
/// * `Wall` - A wall object with position, width, and height.
/// * `Platform` - A platform object with position, width, and height.
///
/// # Fields
///
/// * `position` - The position of the object as a V2 (vector with x and y coordinates).
/// * `width` - The width of the object.
/// * `height` - The height of the object.

import { V2 } from '../../V2/_';

export type GameObject =
  | { kind: 'Wall', position: V2, width: number, height: number }
  | { kind: 'Platform', position: V2, width: number, height: number };
