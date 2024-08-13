/// Updates the state of players and a projectile based on collisions.
///
/// # Description
///
/// This function checks for collisions between a projectile and all players,
/// updating the state of both the players and the projectile accordingly.
/// If a player is killed by the projectile, it also updates the kill count
/// of the projectile's owner.
///
/// # Args
///
/// * `players` - A map of player UIDs to Player objects
/// * `projectile` - The projectile to check for collisions
///
/// # Returns
///
/// A tuple containing the updated map of players and the updated projectile

import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';
import { Projectile } from './_';
import { check_player_collision } from './check_player_collision';

export function update_projectile_player_collisions(players: Map<UID, Player>, projectile: Projectile): [Map<UID, Player>, Projectile] {
  const updated_players = players.withMutations(mutable_players => {
    mutable_players.forEach((player, player_id) => {
      const [collision_player, collision_projectile] = check_player_collision(projectile, player, player_id);

      projectile = collision_projectile;
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
  return [updated_players, projectile];
}
