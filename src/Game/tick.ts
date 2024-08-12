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
import { check_game_object_collision as check_projectile_game_object_collision } from '../Projectile/check_game_object_collision';
import { create_character } from '../Character/create_character';

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolation_factor = 0.1;

  // Update projectiles
  let updated_players = gs.players;
  let updated_game_map = gs.game_map;
  const projectile_system = gs.projectile_system.flatMap((projectile, id) => {
    projectile.remaining_duration -= dt;

    const owner_player = updated_players.get(projectile.owner_id);

    updated_players = updated_players.withMutations(mutable_players => {
      mutable_players.forEach((player, player_id) => {
        const [collision_player, collision_projectile] = check_projectile_player_collision(projectile, player, player_id);
        
        // If the projectile hit the player
        if (collision_player !== player) {
          mutable_players.set(player_id, collision_player);
          projectile = collision_projectile;

          // Check if the player was killed by this projectile
          if (collision_player.life <= 0 && player_id !== projectile.owner_id) {
            const owner_player = mutable_players.get(projectile.owner_id);
            if (owner_player) {

              const updated_owner = {
                ...owner_player,
                stats: {
                  ...owner_player.stats,
                  kills: (owner_player.stats.kills || 0) + 1
                }
              };
              mutable_players.set(projectile.owner_id, updated_owner);
              
            }
          }
        }
      });
    });

    // Check projectile collision with game objects
    updated_game_map = {
      ...updated_game_map,
      objects: updated_game_map.objects.map(game_object => {
        const [updated_game_object, updated_projectile] = check_projectile_game_object_collision(projectile, game_object);
        
        // Check if the orb was destroyed
       if (game_object.kind === 'Orb' && game_object.life > 0 && updated_game_object.kind === 'Orb' && updated_game_object.life <= 0 && owner_player) {

          const owner_player_character = create_character(owner_player.character);
          const max_life_increase = owner_player_character.effects.find(effect => effect.$ === 'OrbGivesMaxLife')?.life || 0;
          const movement_speed = owner_player_character.effects.find(effect => effect.$ === 'IncreaseMoveSpeed');

          if (movement_speed) {
            movement_speed.percentage += movement_speed.percentage;
          }
          

          updated_players = updated_players.set(projectile.owner_id, {
            ...owner_player,
            stats: {
              ...owner_player.stats,
              destroyed_orbs: owner_player.stats.destroyed_orbs + 1,
              damage_multiplier: owner_player.stats.damage_multiplier + 0.1,
              max_life: owner_player.stats.max_life + max_life_increase,
            }
          });
        }
        
        projectile = updated_projectile;
        return updated_game_object;
      })
    };
    
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
  let new_respawn_areas: GameObject[] = [];
  let new_orbs: GameObject[] = [];
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
          width: PLAYER_RADIUS * 6,
          height: PLAYER_RADIUS * 6,
          active: 3 * TPS // 3 seconds of active time
        };
        new_respawn_areas.push(respawn_area);

        // Create Orb in the center of the map
        const orb: GameObject = {
          kind: 'Orb',
          position: { x: width / 2, y: height / 2 },
          radius: PLAYER_RADIUS,
          life: 100,
          active: 30 * TPS // 30 seconds of active time
        };
        new_orbs.push(orb);
        return;
      }

      const char = create_character(player.character);
      const move_speed_mult = char.effects.find(effect => effect.$ === 'IncreaseMoveSpeed')?.percentage || 0; 

      const speed = PLAYER_SPEED + (PLAYER_SPEED * move_speed_mult);

      const dx = ((player.key["D"] ? speed : 0) + (player.key["A"] ? -speed : 0)) * dt * 90;
      const dy = ((player.key["S"] ? speed : 0) + (player.key["W"] ? -speed : 0)) * dt * 90;

      let new_x = player.pos.x + dx;
      let new_y = player.pos.y + dy;

      // Check collision with other players
      mutable_players.forEach((other_player, other_uid) => {
        if (uid !== other_uid) {
          let result_pos = check_player_collision(player, uid, other_player, other_uid, { x: new_x, y: new_y });
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

  // Update respawn areas and orbs
  updated_game_map = {
    ...updated_game_map,
    objects: [
      ...updated_game_map.objects.filter(obj => 
        (obj.kind !== 'RespawnArea' && obj.kind !== 'Orb') || 
        ((obj.kind === 'RespawnArea' || obj.kind === 'Orb') && obj.active > 0)
      ).map(obj => {
        if (obj.kind === 'RespawnArea' || obj.kind === 'Orb') {
          return {
            ...obj,
            active: obj.active - 1
          };
        }
        return obj;
      }),
      ...new_respawn_areas,
      ...new_orbs
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
