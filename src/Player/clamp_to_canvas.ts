/// Clamps the player's position to the canvas boundaries.
/// # Arguments
/// - pos: The current position of the player.
/// # Returns
/// A new position clamped within the canvas boundaries.

import { V2 } from '../V2/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { PLAYER_RADIUS } from '../Helpers/consts';

export function clamp_to_canvas(pos: V2): V2 {
  const { width, height } = get_canvas_dimensions();
  return {
    x: Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, pos.x)),
    y: Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, pos.y)),
  };
}