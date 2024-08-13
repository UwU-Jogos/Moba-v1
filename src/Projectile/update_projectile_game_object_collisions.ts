/// Updates projectile collisions with game objects.
///
/// # Input
///
/// * `game_map` - The current game map
/// * `projectile` - The projectile to check for collisions
/// * `owner_player` - The player who owns the projectile (optional)
///
/// # Output
///
/// Returns a tuple containing:
/// * The updated GameMap
/// * The updated Projectile after checking collisions

import { GameMap } from '../GameMap/_';
import { Projectile } from './_';
import { Player } from '../Player/_';
import { check_game_object_collision } from './check_game_object_collision';
import { update_owner_player_stats } from '../Player/update_owner_player_stats';

export function update_projectile_game_object_collisions(game_map: GameMap, projectile: Projectile, owner_player: Player | undefined): [GameMap, Projectile] {
  const updated_objects = game_map.objects.map(game_object => {
    const [updated_game_object, updated_projectile] = check_game_object_collision(projectile, game_object);
    
    // Check if the orb was destroyed
    if (game_object.kind === 'Orb' && game_object.life > 0 && updated_game_object.kind === 'Orb' && updated_game_object.life <= 0 && owner_player) {
      owner_player = update_owner_player_stats(owner_player);
    }
    
    projectile = updated_projectile;
    return updated_game_object;
  });

  return [{ ...game_map, objects: updated_objects }, projectile];
}
