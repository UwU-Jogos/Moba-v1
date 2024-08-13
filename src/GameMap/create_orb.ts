/// Creates an Orb game object.
///
/// # Description
///
/// This function creates an Orb game object positioned at the center of the canvas
/// with a specified radius, life, and active duration.
///
/// # Returns
///
/// A GameObject of kind 'Orb' with position, radius, life, and active properties.

import { GameObject } from './GameObject/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { PLAYER_RADIUS, TPS } from '../Helpers/consts';

export function create_orb(): GameObject {
  const { width, height } = get_canvas_dimensions();
  return {
    kind: 'Orb',
    position: { x: width / 2, y: height / 2 },
    radius: PLAYER_RADIUS,
    life: 200,
    active: 30 * TPS // 30 seconds of active time
  };
}