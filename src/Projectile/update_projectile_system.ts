/// Updates the projectile system in the game state.
///
/// # Description
///
/// This function updates all projectiles in the game state. It handles projectile movement,
/// collisions with players and game objects, and removes projectiles that have expired or collided.
///
/// # Args
///
/// * `gs` - The current game state
/// * `dt` - The time delta since the last update
///
/// # Returns
///
/// A tuple containing:
/// * The updated GameState
/// * A new Map of projectiles (projectile system)

import { Map } from 'immutable';
import { GameState } from '../GameState/_';
import { Projectile } from './_';
import { Player } from '../Player/_';
import { GameMap } from '../GameMap/_';
import { update_projectile_player_collisions } from './update_projectile_player_collisions';
import { update_projectile_game_object_collisions } from './update_projectile_game_object_collisions';
import { should_remove_projectile } from './should_remove_projectile';
import { move as move_projectile } from './move';


export function update_projectile_system(gs: GameState, dt: number): [GameState, Map<string, Projectile>] {
  let updated_players = gs.players;
  let updated_game_map = gs.game_map;
  const projectile_system = gs.projectile_system.flatMap((projectile, id) => {
    projectile.remaining_duration -= dt;

    const owner_player = updated_players.get(projectile.owner_id);

    [updated_players, projectile] = update_projectile_player_collisions(updated_players, projectile);
    [updated_game_map, projectile] = update_projectile_game_object_collisions(updated_game_map, projectile, owner_player);
    
    projectile = move_projectile(projectile, owner_player, dt);

    if (should_remove_projectile(projectile)) {
      return [];
    }

    return [[id, projectile]];
  }).toMap() as Map<string, Projectile>;

  return [{ ...gs, players: updated_players, game_map: updated_game_map }, projectile_system];
}
