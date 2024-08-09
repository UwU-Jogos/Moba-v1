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

export function tick(gs: GameState): GameState {
  if (is_dead(gs, TeamType.TEAM_RED) || is_dead(gs, TeamType.TEAM_BLUE)) {
    return restart(gs);
  }

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
  updated_players = updated_players.withMutations(mutable_players => {
    mutable_players.forEach((player, uid) => {
      if (!player) return;

      const dx = player.target_pos.x - player.pos.x;
      const dy = player.target_pos.y - player.pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let new_x = player.pos.x;
      let new_y = player.pos.y;

      if (distance > 0) {
        const move_distance = Math.min(distance, PLAYER_SPEED * dt * 128);
        const ratio = move_distance / distance;

        new_x = player.pos.x + dx * ratio * interpolation_factor;
        new_y = player.pos.y + dy * ratio * interpolation_factor;

        mutable_players.forEach((other_player, other_uid) => {
          if (uid !== other_uid) {
            let result_pos = check_player_collision(uid, other_player, other_uid, { x: new_x, y: new_y });
            new_x = result_pos.x;
            new_y = result_pos.y;
          }
        });

        new_x = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, new_x));
        new_y = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, new_y));
      }

      // Skill logic
      const active_skills = { ...player.active_skills };
      Object.entries(active_skills).forEach(([skill_id, end_tick]) => {
        process_player_skills(gs.tick, end_tick, skill_id, player, uid);
      });

      // Check collision with GameObjects
      gs.game_map.objects.forEach((game_object: GameObject) => {
        let result_pos: V2 = check_game_object_collision(player, { x: new_x, y: new_y }, game_object);
        new_x = result_pos.x; 
        new_y = result_pos.y; 
      });

      // Clamp to canvas boundaries
      new_x = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, new_x));
      new_y = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, new_y));

      mutable_players.set(uid, {
        ...player,
        pos: { x: Math.floor(new_x * 100) / 100, y: Math.floor(new_y * 100) / 100 },
        active_skills,
      });
    });
  });

  return {
    ...gs,
    tick: gs.tick + 1,
    players: updated_players as Map<UID, Player>,
    projectile_system: projectile_system as Map<string, Projectile>,
  };
}
