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
import { update_player_position } from './update_player_position';
import { check_collision as check_player_collision } from './check_collision';
import { check_game_object_collision } from '../Player/check_game_object_collision';
import { update_player_effects } from './update_player_effects';
import { create_respawn_area } from '../GameMap/create_respawn_area';
import { create_orb } from '../GameMap/create_orb';
import { update_game_objects } from '../GameMap/update_game_objects';

export function update_players(gs: GameState, dt: number): GameState {
  const { width, height } = get_canvas_dimensions();
  const new_respawn_areas: GameObject[] = [];
  const new_orbs: GameObject[] = [];

  const updated_players = gs.players.withMutations(mutable_players => {
    mutable_players.forEach((player, uid) => {
      if (!player) return;

      if (is_player_dead(player) && player.stats.lifes > 0) {
        const respawned_player = respawn(player);
        mutable_players.set(uid, respawned_player);

        new_respawn_areas.push(create_respawn_area(player.team, width, height));
        new_orbs.push(create_orb(width, height));
        return;
      }

      let new_pos = update_player_position(player, dt, width, height);

      mutable_players.forEach((other_player, other_uid) => {
        if (uid !== other_uid) {
          new_pos = check_player_collision(player, uid, other_player, other_uid, new_pos);
        }
      });

      gs.game_map.objects.forEach((game_object: GameObject) => {
        new_pos = check_game_object_collision(player, new_pos, game_object);
      });

      const updated_player = update_player_effects(player);

      mutable_players.set(uid, {
        ...updated_player,
        pos: new_pos,
      });
    });
  });

  const updated_game_map = update_game_objects(gs.game_map, new_respawn_areas, new_orbs);

  return {
    ...gs,
    players: updated_players,
    game_map: updated_game_map,
  };
}
