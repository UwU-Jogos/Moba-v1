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

// Update the tick function
export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolationFactor = 0.1;
  let players = gs.players;
  let projectileSystem = Map(gs.projectileSystem);

  // Update projectiles
  projectileSystem.forEach((projectile, id) => {
    projectile.remainingDuration -= dt;

    switch (projectile.skillType) {
      case "melee":
        const player = players.get(projectile.ownerId);
        if (player) {
          projectile.pos_proj = { ...player.pos };
        }
        break;
      case "target":
        // Target skill remains at the activated position
        break;
      case "action":
        const distanceToTarget = distance(projectile.pos_proj, projectile.target);

        if (distanceToTarget > 0 && projectile.remainingDistance > 0) {
          const moveDistance = Math.min(
            distanceToTarget,
            projectile.speed * dt,
            projectile.remainingDistance
          );
          const ratio = moveDistance / distanceToTarget;

          projectile.pos_proj.x += (projectile.target.x - projectile.pos_proj.x) * ratio;
          projectile.pos_proj.y += (projectile.target.y - projectile.pos_proj.y) * ratio;
          projectile.remainingDistance -= moveDistance;

          if (moveDistance >= distanceToTarget) {
            projectile.pos_proj = { ...projectile.target };
            projectile.remainingDistance = 0;
          }
        }
        break;
    }

    // Check collisions with players
    players.forEach((player, playerId) => {
      if (playerId !== projectile.ownerId) {
        const dist = distance(projectile.pos_proj, player.pos);
        if (dist < PLAYER_RADIUS) {
          console.log(
            `Player ${playerId} hit by ${projectile.skillType} skill from ${projectile.ownerId}`
          );
        }
      }
    });

    // Remove projectiles that have expired or reached their target
    if (
      projectile.remainingDuration <= 0 ||
      (projectile.skillType === "action" && projectile.remainingDistance <= 0)
    ) {
      projectileSystem.delete(id);
    } else {
      projectileSystem.set(id, projectile);
    }
  });

  players = players
    .map((player, uid) => {
      if (!player) return player;

      // Movement logic (remains the same)
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

        // Collision check with other players (remains the same)
        gs.players.forEach((otherPlayer, otherUid) => {
          if (uid !== otherUid) {
            const dx = newX - otherPlayer.pos.x;
            const dy = newY - otherPlayer.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < PLAYER_RADIUS * 2) {
              const angle = Math.atan2(dy, dx);
              newX = otherPlayer.pos.x + Math.cos(angle) * PLAYER_RADIUS * 2;
              newY = otherPlayer.pos.y + Math.sin(angle) * PLAYER_RADIUS * 2;
            }
          }
        });

        // Clamp to canvas boundaries (remains the same)
        newX = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, newX));
        newY = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, newY));
      }

      // // Skill logic
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
                gs.players.forEach((otherPlayer, otherUid) => {
                  if (uid !== otherUid) {
                    const dx = newX - otherPlayer.pos.x;
                    const dy = newY - otherPlayer.pos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < PLAYER_RADIUS * 3) {
                      // Apply melee effect (e.g., damage)
                      console.log(
                        `Player ${uid} hit ${otherUid} with melee skill`
                      );
                    }
                  }
                });
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
    })
    .toMap();

  return {
    ...gs,
    tick: gs.tick + 1,
    players: players as Map<UID, Player>,
    projectileSystem: projectileSystem as Map<string, Projectile>,
  };
}
