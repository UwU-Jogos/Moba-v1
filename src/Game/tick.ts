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
import { restart } from '../GameState/restart';

import { Player } from '../Player/_';
import { update_player } from '../Player/update_player';
import { is_dead as is_player_dead } from '../Player/is_dead';
import { respawn } from '../Player/respawn';
import { check_collision as check_player_collision } from '../Player/check_collision';
import { check_game_object_collision } from '../Player/check_game_object_collision';
import { check_collisions } from '../Player/check_collisions';
import { clamp_to_canvas } from '../Player/clamp_to_canvas';
import { update_player_effects } from '../Player/update_player_effects';

import { UID } from '../UID/_';

import { Map } from 'immutable';

import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { PLAYER_RADIUS, TPS, PLAYER_SPEED } from '../Helpers/consts';
import { distance } from "../Helpers/distance";

import { GameObject } from '../GameMap/GameObject/_';
import { GameMap } from "../GameMap/_";
import { update_game_objects } from '../GameMap/update_game_objects';
import { create_timed_orb_walls } from '../GameMap/create_timed_orb_walls';
import { create_respawn_area } from '../GameMap/create_respawn_area';
import { create_orb } from '../GameMap/create_orb';

import { V2 } from '../V2/_';

import { Projectile } from "../Projectile/_";
import { move as move_projectile } from "../Projectile/move";
import { check_player_collision as check_projectile_player_collision } from "../Projectile/check_player_collision";
import { check_game_object_collision as check_projectile_game_object_collision } from '../Projectile/check_game_object_collision';
import { update_projectile_system } from '../Projectile/update_projectile_system';

import { Effect } from "../Effect/_";

import { process_player_skills } from "../Skill/process";

import { is_dead } from '../Team/is_dead';
import { TeamType } from '../Team/type';

import { create_character } from '../Character/create_character';

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  let new_respawn_areas: GameObject[] = [];
  let new_orbs: GameObject[] = [];

  const [updated_gs, projectile_system] = update_projectile_system(gs, dt);
  
  let updated_players = updated_gs.players.withMutations((mutable_players: Map<UID, Player>) => {
    mutable_players.forEach((player, uid) => {
      const updated_player: Player = update_player(player, uid, dt, mutable_players, updated_gs.game_map);
      if (updated_player !== player) {
        mutable_players.set(uid, updated_player);
        if (is_player_dead(player) && !is_player_dead(updated_player)) {
          new_respawn_areas.push(create_respawn_area(updated_player));
          new_orbs.push(create_orb());
        }
      }
    });
  });

  let updated_game_map = update_game_objects(updated_gs.game_map, new_respawn_areas, new_orbs);

  if (gs.tick % (5 * TPS) === 0) {
    const new_timed_orb_walls = create_timed_orb_walls(gs.tick);
    updated_game_map.objects.push(...new_timed_orb_walls);
  }

  updated_game_map.objects = updated_game_map.objects.filter(obj => 
    obj.kind !== 'TimedLineWall' || (obj.kind === 'TimedLineWall' && obj.active > 0)
  );

  return {
    ...gs,
    tick: gs.tick + 1,
    players: updated_players,
    projectile_system: projectile_system,
    game_map: updated_game_map,
  };
}

