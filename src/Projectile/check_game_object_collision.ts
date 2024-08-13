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
import { match as match_game_object } from '../GameMap/GameObject/match';
import { distance } from '../Helpers/distance';

export function check_game_object_collision(projectile: Projectile, game_object: GameObject): [GameObject, Projectile] {
  if (projectile.effects.some(effect => effect.$ === 'ShotThroughWall')) {
    return [game_object, projectile];
  }

  return match_game_object(game_object, {
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
    },
    LineWall: (ini, end) => check_line_wall_collision(projectile, game_object, ini, end),
    TimedLineWall: (ini, end, active) => {
      if (active == 0) { return [game_object, projectile]; }
      else { return check_line_wall_collision(projectile, game_object, ini, end); }
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

function check_line_wall_collision(projectile: Projectile, game_object: GameObject, ini: V2, end: V2): [GameObject, Projectile] {
  const dx = end.x - ini.x;
  const dy = end.y - ini.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const normalX = -dy / length;
  const normalY = dx / length;

  const projectileToWallX = projectile.pos.x - ini.x;
  const projectileToWallY = projectile.pos.y - ini.y;

  const projection = projectileToWallX * normalX + projectileToWallY * normalY;

  if (Math.abs(projection) < 5) { // Increased collision threshold
    const closestX = ini.x + ((projectile.pos.x - ini.x) * dx + (projectile.pos.y - ini.y) * dy) / (length * length) * dx;
    const closestY = ini.y + ((projectile.pos.x - ini.x) * dx + (projectile.pos.y - ini.y) * dy) / (length * length) * dy;

    const distanceToLine = Math.sqrt(
      (projectile.pos.x - closestX) * (projectile.pos.x - closestX) +
      (projectile.pos.y - closestY) * (projectile.pos.y - closestY)
    );

    if (distanceToLine < 5 && // Increased collision threshold
        closestX >= Math.min(ini.x, end.x) && closestX <= Math.max(ini.x, end.x) &&
        closestY >= Math.min(ini.y, end.y) && closestY <= Math.max(ini.y, end.y)) {
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
  }

  return [game_object, projectile];
}
