import { Skill } from './_';
import { V2 } from '../V2/_';
import { GameObject } from '../GameMap/GameObject/_';
import { Map } from 'immutable';
import { match as match_game_object } from '../GameMap/GameObject/match';
import { distance } from '../Helpers/distance';

// Checks collision between a skill and a game object
// - skill: the skill to check
// - game_object: the game object to check against
// = a tuple with potentially updated game object and skill
export function check_game_object_collision(skill: Skill, game_object: GameObject): [GameObject, Skill] {
  switch (skill.$) {
    case "Projectile":
      return check_projectile_collision(skill, game_object);
    case "HealArea":
      return [game_object, skill];
  }
}

// Checks collision between a projectile skill and a game object
// - skill: the projectile skill to check
// - game_object: the game object to check against
// = a tuple with potentially updated game object and skill
function check_projectile_collision(skill: Skill & { $: "Projectile" }, game_object: GameObject): [GameObject, Skill] {
  return match_game_object(game_object, {
    Wall: (position, width, height) => check_rectangle_collision(skill, game_object, position, width, height),
    Platform: (position, width, height) => check_rectangle_collision(skill, game_object, position, width, height),
    PushWall: (position, width, height) => check_rectangle_collision(skill, game_object, position, width, height),
    RespawnArea: () => [game_object, skill],
    Orb: (position, radius, life, active) => check_orb_collision(skill, game_object, position, radius, life, active),
    LineWall: (ini, end) => check_line_wall_collision(skill, game_object, ini, end),
    TimedLineWall: (ini, end, active) => check_timed_line_wall_collision(skill, game_object, ini, end, active)
  });
}

// Checks collision between a heal area skill and a game object
// - skill: the heal area skill to check
// - game_object: the game object to check against
// = a tuple with the unchanged game object and skill
function check_heal_area_collision(skill: Skill & { $: "HealArea" }, game_object: GameObject): [GameObject, Skill] {
  return [game_object, skill];
}

// Checks collision between a projectile skill and a rectangular game object
// - skill: the projectile skill to check
// - game_object: the game object to check against
// - position: the position of the rectangle
// - width: the width of the rectangle
// - height: the height of the rectangle
// = a tuple with potentially updated game object and skill
function check_rectangle_collision(skill: Skill & { $: "Projectile" }, game_object: GameObject, position: V2, width: number, height: number): [GameObject, Skill] {
  if (skill.effects.some(effect => effect.$ === 'ShotThroughWall')) {
    return [game_object, skill];
  }

  const left = position.x;
  const right = position.x + width;
  const top = position.y;
  const bottom = position.y + height;

  if (skill.pos.x >= left && skill.pos.x <= right &&
      skill.pos.y >= top && skill.pos.y <= bottom) {
    // Collision detected, make projectile useless
    return [
      game_object,
      {
        ...skill,
        range: 0
      }
    ];
  }

  return [game_object, skill];
}

// Checks collision between a projectile skill and an orb game object
// - skill: the projectile skill to check
// - game_object: the game object to check against
// - position: the position of the orb
// - radius: the radius of the orb
// - life: the life of the orb
// - active: whether the orb is active
// = a tuple with potentially updated game object and skill
function check_orb_collision(skill: Skill & { $: "Projectile" }, game_object: GameObject, position: V2, radius: number, life: number, active: number): [GameObject, Skill] {
  if (game_object.kind === 'Orb' && active && distance(skill.pos, position) <= radius) {
    // Collision with active orb
    return [
      { ...game_object, life: life - skill.damage },
      {
        ...skill,
        range: 0
      }
    ];
  }
  return [game_object, skill];
}

// Checks collision between a projectile skill and a line wall game object
// - skill: the projectile skill to check
// - game_object: the game object to check against
// - ini: the start point of the line
// - end: the end point of the line
// = a tuple with potentially updated game object and skill
function check_line_wall_collision(skill: Skill & { $: "Projectile" }, game_object: GameObject, ini: V2, end: V2): [GameObject, Skill] {
  if (skill.effects.some(effect => effect.$ === 'ShotThroughWall')) {
    return [game_object, skill];
  }

  const dx = end.x - ini.x;
  const dy = end.y - ini.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const normalX = -dy / length;
  const normalY = dx / length;

  const projectileToWallX = skill.pos.x - ini.x;
  const projectileToWallY = skill.pos.y - ini.y;

  const projection = projectileToWallX * normalX + projectileToWallY * normalY;

  if (Math.abs(projection) < 5) { // Increased collision threshold
    const closestX = ini.x + ((skill.pos.x - ini.x) * dx + (skill.pos.y - ini.y) * dy) / (length * length) * dx;
    const closestY = ini.y + ((skill.pos.x - ini.x) * dx + (skill.pos.y - ini.y) * dy) / (length * length) * dy;

    const distanceToLine = Math.sqrt(
      (skill.pos.x - closestX) * (skill.pos.x - closestX) +
      (skill.pos.y - closestY) * (skill.pos.y - closestY)
    );

    if (distanceToLine < 5 && // Increased collision threshold
        closestX >= Math.min(ini.x, end.x) && closestX <= Math.max(ini.x, end.x) &&
        closestY >= Math.min(ini.y, end.y) && closestY <= Math.max(ini.y, end.y)) {
      // Collision detected, make projectile useless
      return [
        game_object,
        {
          ...skill,
          range: 0
        }
      ];
    }
  }

  return [game_object, skill];
}

// Checks collision between a projectile skill and a timed line wall game object
// - skill: the projectile skill to check
// - game_object: the game object to check against
// - ini: the start point of the line
// - end: the end point of the line
// - active: whether the timed line wall is active
// = a tuple with potentially updated game object and skill
function check_timed_line_wall_collision(skill: Skill & { $: "Projectile" }, game_object: GameObject, ini: V2, end: V2, active: number): [GameObject, Skill] {
  if (active === 0) { 
    return [game_object, skill]; 
  } else { 
    return check_line_wall_collision(skill, game_object, ini, end); 
  }
}
