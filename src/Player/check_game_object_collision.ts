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

  if (game_object.kind === 'Wall' || game_object.kind === 'Platform' || game_object.kind === 'PushWall' || game_object.kind === 'RespawnArea') {
    const left = game_object.position.x;
    const right = game_object.position.x + game_object.width;
    const top = game_object.position.y;
    const bottom = game_object.position.y + game_object.height;

    // Check if player is colliding with the object
    if (new_x + PLAYER_RADIUS > left && new_x - PLAYER_RADIUS < right &&
        new_y + PLAYER_RADIUS > top && new_y - PLAYER_RADIUS < bottom) {
      
      if (game_object.kind === 'RespawnArea') {
        // For RespawnArea, keep the player inside
        new_x = Math.max(left + PLAYER_RADIUS, Math.min(right - PLAYER_RADIUS, new_x));
        new_y = Math.max(top + PLAYER_RADIUS, Math.min(bottom - PLAYER_RADIUS, new_y));
      } else {
        // Calculate overlap on each axis
        const overlapLeft = new_x + PLAYER_RADIUS - left;
        const overlapRight = right - (new_x - PLAYER_RADIUS);
        const overlapTop = new_y + PLAYER_RADIUS - top;
        const overlapBottom = bottom - (new_y - PLAYER_RADIUS);

        // Find the smallest overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        // Resolve collision based on the smallest overlap
        if (minOverlap === overlapLeft) {
          new_x = left - PLAYER_RADIUS;
        } else if (minOverlap === overlapRight) {
          new_x = right + PLAYER_RADIUS;
        } else if (minOverlap === overlapTop) {
          new_y = top - PLAYER_RADIUS;
        } else if (minOverlap === overlapBottom) {
          new_y = bottom + PLAYER_RADIUS;
        }

        // Handle PushWall
        if (game_object.kind === 'PushWall') {
          const centerX = left + game_object.width / 2;
          const centerY = top + game_object.height / 2;
          const dx = centerX - new_x;
          const dy = centerY - new_y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;
          new_x -= normalizedDx * game_object.force;
          new_y -= normalizedDy * game_object.force;
        }
      }
    }
  } else if (game_object.kind === 'LineWall') {
    // Handle LineWall collision
    const dx = game_object.end.x - game_object.ini.x;
    const dy = game_object.end.y - game_object.ini.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const normalX = -dy / length;
    const normalY = dx / length;

    const playerToWallX = new_x - game_object.ini.x;
    const playerToWallY = new_y - game_object.ini.y;

    const projection = playerToWallX * normalX + playerToWallY * normalY;

    if (Math.abs(projection) < PLAYER_RADIUS) {
      const closestX = new_x - projection * normalX;
      const closestY = new_y - projection * normalY;

      const t = ((closestX - game_object.ini.x) * dx + (closestY - game_object.ini.y) * dy) / (length * length);

      if (t >= 0 && t <= 1) {
        new_x = closestX + normalX * PLAYER_RADIUS * Math.sign(projection);
        new_y = closestY + normalY * PLAYER_RADIUS * Math.sign(projection);
      }
    }
  }

  return { x: new_x, y: new_y };
}
