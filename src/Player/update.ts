/// Updates all players in the game state.
///
/// # Arguments
///
/// * `gs` - The current game state
/// * `dt` - Delta time since the last update
///
/// # Returns
///
/// A new GameState with updated players, respawn areas, and orbs.
///
/// # Description
///
/// This function performs the following operations for each player:
/// 1. Checks if the player is dead and needs to respawn
/// 2. Updates player position based on input and game constraints
/// 3. Checks for collisions with other players and game objects
/// 4. Processes active skills
/// 5. Updates player effects
///
/// It also creates new respawn areas and orbs as needed.

import { GameState } from '../GameState/_';
import { GameObject } from '../GameMap/GameObject/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { is_dead as is_player_dead } from './is_dead';
import { respawn } from './respawn';
import { update_player_position } from './update/update_player_position';
import { check_collision as check_player_collision } from './check_collision';
import { check_game_object_collision } from '../Player/check_game_object_collision';
import { update_player_effects } from './update/update_player_effects';
import { create_respawn_area } from '../GameMap/create_respawn_area';
import { create_orb } from '../GameMap/create_orb';
import { update_game_objects } from '../GameMap/update_game_objects';

export function update(gs: GameState, dt: number): GameState {
  const { width, height } = get_canvas_dimensions();
  let new_respawn_areas: GameObject[] = [];
  let new_orbs: GameObject[] = [];

  const updated_players = gs.players.map((player, uid) => {
    if (!player) return player;

    if (is_player_dead(player) && player.stats.lifes > 0) {
      const respawned_player = respawn(player);
      new_respawn_areas = [...new_respawn_areas, create_respawn_area(player.team, width, height)];
      new_orbs = [...new_orbs, create_orb(width, height)];
      return respawned_player;
    }

    let new_pos = update_player_position(player, dt, width, height);

    new_pos = gs.players.reduce((pos, other_player, other_uid) => {
      return uid !== other_uid
        ? check_player_collision(player, uid, other_player, other_uid, pos)
        : pos;
    }, new_pos);

    new_pos = gs.game_map.objects.reduce((pos, game_object) => {
      return check_game_object_collision(player, pos, game_object);
    }, new_pos);

    const updated_player = update_player_effects(player);

    return {
      ...updated_player,
      pos: new_pos,
    };
  });

  const updated_game_map = update_game_objects(gs.game_map, new_respawn_areas, new_orbs);

  return {
    ...gs,
    players: updated_players,
    game_map: updated_game_map,
  };
}
