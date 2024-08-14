/// Creates an Orb game object.
///
/// # Description
///
/// This function creates an Orb game object positioned at the center of the given dimensions
/// with a specified radius, life, and active duration.
///
/// # Parameters
///
/// * `width` - The width of the game area
/// * `height` - The height of the game area
///
/// # Returns
///
/// A GameObject of kind 'Orb' with position, radius, life, and active properties.

import { GameObject } from '../GameMap/GameObject/_';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { seconds_to_ticks } from '../Helpers/seconds_to_ticks';

export function create_orb(width: number, height: number): GameObject {
  return {
    kind: 'Orb',
    position: { x: width / 2, y: height / 2 },
    radius: PLAYER_RADIUS,
    life: 200,
    active: seconds_to_ticks(30) // 30 seconds of active time
  };
}
