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
import { PLAYER_RADIUS } from '../Helpers/consts';

export function check_game_object_collision(player: Player, pos: V2, game_object: GameObject): V2 {
  let new_x = pos.x;
  let new_y = pos.y;

  if (game_object.kind === 'Wall' || game_object.kind === 'Platform') {
    const left = game_object.position.x;
    const right = game_object.position.x + game_object.width;
    const top = game_object.position.y;
    const bottom = game_object.position.y + game_object.height;

    // Check if player is colliding with the object
    if (new_x + PLAYER_RADIUS > left && new_x - PLAYER_RADIUS < right &&
        new_y + PLAYER_RADIUS > top && new_y - PLAYER_RADIUS < bottom) {
      // Resolve collision
      if (Math.abs(player.pos.x - left) <= PLAYER_RADIUS) new_x   = left - PLAYER_RADIUS;
      if (Math.abs(player.pos.x - right) <= PLAYER_RADIUS) new_x  = right + PLAYER_RADIUS;
      if (Math.abs(player.pos.y - top) <= PLAYER_RADIUS) new_y    = top - PLAYER_RADIUS;
      if (Math.abs(player.pos.y - bottom) <= PLAYER_RADIUS) new_y = bottom + PLAYER_RADIUS;
    }
  }
  return { x: new_x, y: new_y };
}
