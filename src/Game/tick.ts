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
import { move as move_projectile } from "../Projectile/move";
import { process_player_skills } from "../Skill/process";
import { check_player_collision as check_projectile_player_collision } from "../Projectile/check_player_collision";
import { is_dead } from '../Team/is_dead';
import { TeamType } from '../Team/type';
import { restart } from '../GameState/restart';
import { is_dead as is_player_dead } from '../Player/is_dead';
import { respawn } from '../Player/respawn';

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolation_factor = 0.1;

  // Update projectiles
  let updated_players = gs.players;
  const projectile_system = gs.projectile_system.flatMap((projectile, id) => {
    projectile.remaining_duration -= dt;

    const owner_player = updated_players.get(projectile.owner_id);

    // Check projectile collision with players
    updated_players = updated_players.withMutations(mutable_players => {
      mutable_players.forEach((player, player_id) => {
        const [updated_player, updated_projectile] = check_projectile_player_collision(projectile, player, player_id);
        
        // Check if the player was killed by this projectile
        if (player.life > 0 && updated_player.life <= 0 && owner_player) {
          mutable_players.set(projectile.owner_id, {
            ...owner_player,
            stats: {
              ...owner_player.stats,
              kills: owner_player.stats.kills + 1
            }
          });
        }
        
        mutable_players.set(player_id, updated_player);
        projectile = updated_projectile;
      });
    });

    projectile = move_projectile(projectile, owner_player, dt);

    if (
      projectile &&
      (projectile.remaining_duration <= 0 ||
      (projectile.skill_type === "action" && projectile.remaining_distance <= 0))
    ) {
      return [];
    }

    return [[id, projectile]];
  }).toMap() as Map<string, Projectile>;

  // Update players
  let updated_game_map = gs.game_map;
  let new_respawn_areas: GameObject[] = [];
  updated_players = updated_players.withMutations(mutable_players => {
    mutable_players.forEach((player, uid) => {
      if (!player) return;

      // Check if player is dead and respawn if necessary
      if (is_player_dead(player) && player.stats.lifes > 0) {
        const respawned_player = respawn(player);
        mutable_players.set(uid, respawned_player);
        
        // Create respawn area
        const respawn_area: GameObject = {
          kind: 'RespawnArea',
          position: player.team === TeamType.TEAM_RED ? { x: 0, y: 0 } : { x: width - PLAYER_RADIUS * 4, y: height - PLAYER_RADIUS * 4 },
          width: PLAYER_RADIUS * 4,
          height: PLAYER_RADIUS * 4,
          active: 5 * TPS // 5 seconds of active time
        };
        new_respawn_areas.push(respawn_area);
        return;
      }

      const dx = ((player.key["D"] ? PLAYER_SPEED : 0) + (player.key["A"] ? -PLAYER_SPEED : 0)) * dt * 90;
      const dy = ((player.key["S"] ? PLAYER_SPEED : 0) + (player.key["W"] ? -PLAYER_SPEED : 0)) * dt * 90;

      let new_x = player.pos.x + dx;
      let new_y = player.pos.y + dy;

      // Check collision with other players
      mutable_players.forEach((other_player, other_uid) => {
        if (uid !== other_uid) {
          let result_pos = check_player_collision(uid, other_player, other_uid, { x: new_x, y: new_y });
          new_x = result_pos.x;
          new_y = result_pos.y;
        }
      });

      // Skill logic
      const active_skills = { ...player.active_skills };
      Object.entries(active_skills).forEach(([skill_id, end_tick]) => {
        process_player_skills(gs.tick, end_tick, skill_id, player, uid);
      });

      //Check collision with GameObjects
      gs.game_map.objects.forEach((game_object: GameObject) => {
        let result_pos: V2 = check_game_object_collision(player, { x: new_x, y: new_y }, game_object);
        new_x = result_pos.x; 
        new_y = result_pos.y; 
      });

      // Clamp to canvas boundaries
      new_x = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, new_x));
      new_y = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, new_y));

      // Update Immune effect
      const updated_effects = player.effects.map(effect => {
        if (effect.$ === 'Immune' && effect.active > 0) {
          return { ...effect, active: effect.active - 1 };
        }
        return effect;
      }).filter(effect => effect.$ !== 'Immune' || effect.active > 0);

      mutable_players.set(uid, {
        ...player,
        pos: { x: new_x, y: new_y },
        active_skills,
        effects: updated_effects,
      });
    });
  });

  // Update respawn areas
  updated_game_map = {
    ...updated_game_map,
    objects: [
      ...updated_game_map.objects.filter(obj => obj.kind !== 'RespawnArea' || (obj.kind === 'RespawnArea' && obj.active > 0))
        .map(obj => {
          if (obj.kind === 'RespawnArea') {
            return {
              ...obj,
              active: obj.active - 1
            };
          }
          return obj;
        }),
      ...new_respawn_areas
    ]
  };

  return {
    ...gs,
    tick: gs.tick + 1,
    players: updated_players as Map<UID, Player>,
    projectile_system: projectile_system as Map<string, Projectile>,
    game_map: updated_game_map,
  };
}
