/// Updates the game state for a single tick.
///
/// # Input
///
/// * `state` - The current game state
///
/// # Output
///
/// Returns the updated GameState after processing a single tick

import { GameState } from '../GameState/_';
import { Player } from '../Player/_';
import { UID } from '../UID/_';
import { Map } from 'immutable';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { PLAYER_RADIUS, TPS, PLAYER_SPEED } from '../Helpers/consts';
import { GameObject } from '../GameMap/GameObject/_';
import { check_collision as check_player_collision } from '../Player/check_collision';
import { check_game_object_collision } from '../Player/check_game_object_collision';
import { V2 } from '../V2/_';
import { distance } from "../Helpers/distance";
import { Projectile } from "../Projectile/_";

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolationFactor = 0.1;

  // Update projectiles
  const projectileSystem = gs.projectileSystem.map((projectile, id) => {
    projectile.remainingDuration -= dt;

    switch (projectile.skillType) {
      case "melee":
        const ownerPlayer = gs.players.get(projectile.ownerId);
        if (ownerPlayer) {
          projectile.pos = { ...ownerPlayer.pos };
        }
        break;

      case "target":
        // Target skill remains at the activated position
        projectile.pos = { ...projectile.target };
        break;

      case "action":
        const distanceToTarget = distance(projectile.pos, projectile.target);
        if (distanceToTarget > 0 && projectile.remainingDistance > 0) {
          const moveDistance = Math.min(
            distanceToTarget,
            projectile.speed * dt,
            projectile.remainingDistance
          );
          const ratio = moveDistance / distanceToTarget;

          projectile.pos.x += (projectile.target.x - projectile.pos.x) * ratio;
          projectile.pos.y += (projectile.target.y - projectile.pos.y) * ratio;
          projectile.remainingDistance -= moveDistance;

          if (moveDistance >= distanceToTarget) {
            projectile.pos = { ...projectile.target };
            projectile.remainingDistance = 0;
          }
        }
        break;
    }

    // Check collisions with players
    gs.players.forEach((player, playerId) => {
      if (playerId !== projectile.ownerId) {
        const dist_enemy = projectile.skillType === 'melee' ? projectile.range * 1.5 : PLAYER_RADIUS * 2;
        const dist = parseInt(distance(projectile.pos, player.pos).toFixed(2));
        if (dist < dist_enemy) {
          console.log(`Player ${playerId} hit by ${projectile.skillType} skill from ${projectile.ownerId}`);
        }
      }
    });

    // Remove projectiles that have expired or reached their target
    if (
      projectile.remainingDuration <= 0 ||
      (projectile.skillType === "action" && projectile.remainingDistance <= 0)
    ) {
      return undefined;
    }

    return projectile;
  }).filter(proj => proj !== undefined).toMap() as Map<string, Projectile>;

  // Update players
  const players = gs.players.map((player, uid) => {
    if (!player) return player;

    const dx = player.target_pos.x - player.pos.x;
    const dy = player.target_pos.y - player.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let newX = player.pos.x;
    let newY = player.pos.y;

    if (distance > 0) {
      const moveDistance = Math.min(distance, PLAYER_SPEED * dt * 128);
      const ratio = moveDistance / distance;

      newX = player.pos.x + dx * ratio * interpolationFactor;
      newY = player.pos.y + dy * ratio * interpolationFactor;

      gs.players.forEach((otherPlayer, otherUid) => {
        let result_pos = check_player_collision(uid, otherPlayer, otherUid, { x: newX, y: newY });
        newX = result_pos.x;
        newY = result_pos.y;
      });

      newX = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, newX));
      newY = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, newY));
    }

    // Skill logic
    const activeSkills = { ...player.activeSkills };
    Object.entries(activeSkills).forEach(([skillId, endTick]) => {
      if (gs.tick >= endTick) {
        delete activeSkills[skillId];
      } else {
        const skill = Object.values(player.skills).find(
          (s) => s.id === skillId
        );
        if (skill) {
          switch (skill.type) {
            case "melee":
              // Apply melee effect (e.g., damage nearby players)
              // Apply melee effect (e.g., damage)
              console.log(`Player ${uid} hit with melee skill`);
              break;
            case "target":
              // Apply target effect (e.g., heal or buff self)
              console.log(`Player ${uid} used target skill on self`);
              break;
            case "action":
              // Move projectile or apply continuous effect
              // This is a simplified example; you might want to add projectile logic
              console.log(`Player ${uid} is using action skill`);
              break;
          }
        }
      }
    });

    // Check collision with GameObjects
    gs.game_map.objects.forEach((game_object: GameObject) => {
      let result_pos: V2 = check_game_object_collision(player, { x: newX, y: newY }, game_object);
      newX = result_pos.x; 
      newY = result_pos.y; 
    });

    // Clamp to canvas boundaries
    newX = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, newX));
    newY = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, newY));

    return {
      ...player,
      pos: { x: newX, y: newY },
      activeSkills,
    };
  }).toMap();

  return {
    ...gs,
    tick: gs.tick + 1,
    players: players as Map<UID, Player>,
    projectileSystem: projectileSystem as Map<string, Projectile>,
  };
}
