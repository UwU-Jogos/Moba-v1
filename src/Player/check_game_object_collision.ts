/// Checks if a player is colliding with some game_object.
///
/// # Args
///
/// * `pid` - The unique identifier of the player
/// * `other_player` - The player we are checking collision against. 
/// * `other_pid` - The pid of other player
/// * `pos` - The old position
///
/// # Return
/// The new position after resolving collision with any game object

import { Player } from './_';
import { GameObject } from '../GameMap/GameObject/_';
import { V2 } from '../V2/_';
import { PLAYER_SQUARE_SIZE } from '../Helpers/consts';

export function check_game_object_collision(player: Player, pos: V2, game_object: GameObject): V2 {
  let new_x = pos.x;
  let new_y = pos.y;

  if (game_object.kind === 'Wall' || game_object.kind === 'Platform') {
    const player_left = new_x;
    const player_right = new_x + PLAYER_SQUARE_SIZE;
    const player_top = new_y;
    const player_bottom = new_y + PLAYER_SQUARE_SIZE;

    const object_left = game_object.position.x;
    const object_right = game_object.position.x + game_object.width;
    const object_top = game_object.position.y;
    const object_bottom = game_object.position.y + game_object.height;

    // Check if player is colliding with the object
    if (player_right > object_left && player_left < object_right &&
        player_bottom > object_top && player_top < object_bottom) {
      // Resolve collision
      const overlap_right = player_right - object_left;
      const overlap_left = object_right - player_left;
      const overlap_bottom = player_bottom - object_top;
      const overlap_top = object_bottom - player_top;

      // Find the smallest overlap
      const min_overlap = Math.min(overlap_right, overlap_left, overlap_bottom, overlap_top);

      if (min_overlap === overlap_right) {
        new_x = object_left - PLAYER_SQUARE_SIZE;
      } else if (min_overlap === overlap_left) {
        new_x = object_right;
      } else if (min_overlap === overlap_bottom) {
        new_y = object_top - PLAYER_SQUARE_SIZE;
      } else if (min_overlap === overlap_top) {
        new_y = object_bottom;
      }
    }
  }
  return { x: new_x, y: new_y };
}
