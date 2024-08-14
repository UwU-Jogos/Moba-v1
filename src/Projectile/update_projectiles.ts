/// Updates all projectiles in the game state.
///
/// # Arguments
/// - gs: The current game state
/// - dt: Delta time, the time elapsed since the last update
///
/// # Returns
/// An updated GameState object with updated projectiles, players, and game map

import { GameState } from '../GameState/_';
import { Map } from 'immutable';
import { Projectile } from './_';
import { move as move_projectile } from './move';
import { check_player_collision as check_projectile_player_collision } from './check_player_collision';
import { check_game_object_collision as check_projectile_game_object_collision } from './check_game_object_collision';
import { update_player_on_orb_destruction } from '../Player/update_player_on_orb_destruction';

export function update_projectiles(gs: GameState, dt: number): GameState {
    let updated_players = gs.players;
    let updated_game_map = gs.game_map;
    const projectile_system = gs.projectile_system.flatMap((projectile, id) => {
      projectile.remaining_duration -= dt;

       const this_owner_player = updated_players.get(projectile.owner_id);

      updated_players = updated_players.withMutations(mutable_players => {
        mutable_players.forEach((player, player_id) => {
          const [collision_player, collision_projectile] = check_projectile_player_collision(projectile, player, player_id);

          if (collision_player !== player) {
            mutable_players.set(player_id, collision_player);
            projectile = collision_projectile;

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

      updated_game_map = {
        ...updated_game_map,
        objects: updated_game_map.objects.map(game_object => {
          const [updated_game_object, updated_projectile] = check_projectile_game_object_collision(projectile, game_object);

          if (game_object.kind === 'Orb' && game_object.life > 0 && updated_game_object.kind === 'Orb' && updated_game_object.life <= 0 && this_owner_player) {
            updated_players = update_player_on_orb_destruction(updated_players, this_owner_player, projectile);
          }

          projectile = updated_projectile;
          return updated_game_object;
        })
      };

      projectile = move_projectile(projectile, this_owner_player, dt);

      if (
        projectile &&
        (projectile.remaining_duration <= 0 ||
        (projectile.skill_type === "action" && projectile.remaining_distance <= 0))
      ) {
        return [];
      }

      return [[id, projectile]];
    }).toMap() as Map<string, Projectile>;

    return {
      ...gs,
      players: updated_players,
      game_map: updated_game_map,
      projectile_system,
    };
  }
