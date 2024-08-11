/// Checks if a projectile collides with a game object and updates accordingly.
///
/// # Input
///
/// * `projectile` - The projectile to check for collision
/// * `game_object` - The game object to check collision against
///
/// # Output
///
/// A tuple containing the updated game object and projectile after checking collision

import { Projectile } from './_';
import { V2 } from '../V2/_';
import { GameObject } from '../GameMap/GameObject/_';
import { match as matchGameObject } from '../GameMap/GameObject/match';
import { distance } from '../Helpers/distance';

export function check_game_object_collision(projectile: Projectile, game_object: GameObject): [GameObject, Projectile] {
  return matchGameObject(game_object, {
    Wall: (position, width, height) => check_rectangle_collision(projectile, game_object, position, width, height),
    Platform: (position, width, height) => check_rectangle_collision(projectile, game_object, position, width, height),
    PushWall: (position, width, height) => check_rectangle_collision(projectile, game_object, position, width, height),
    RespawnArea: () => [game_object, projectile], // RespawnArea doesn't affect projectiles
    Orb: (position, radius, life, active) => {
      if (active && distance(projectile.pos, position) <= radius) {
        // Collision with active orb
        return [
          { ...game_object, life: life - projectile.damage },
          {
            ...projectile,
            remaining_distance: 0,
            remaining_duration: 0,
          }
        ];
      }
      return [game_object, projectile];
    }
  });
}

function check_rectangle_collision(projectile: Projectile, game_object: GameObject, position: V2, width: number, height: number): [GameObject, Projectile] {
  const left = position.x;
  const right = position.x + width;
  const top = position.y;
  const bottom = position.y + height;

  if (projectile.pos.x >= left && projectile.pos.x <= right &&
      projectile.pos.y >= top && projectile.pos.y <= bottom) {
    // Collision detected, make projectile useless
    return [
      game_object,
      {
        ...projectile,
        remaining_distance: 0,
        remaining_duration: 0
      }
    ];
  }

  return [game_object, projectile];
}
