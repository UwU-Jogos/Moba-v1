/// Updates all skills in the game state.
///
/// # Arguments
/// - gs: The current game state
/// - dt: Delta time, the time elapsed since the last update
///
/// # Returns
/// An updated GameState object with updated skills, players, and game map

import { GameState } from '../GameState/_';
import { Map } from 'immutable';
import { TPS } from '../Helpers/consts';
import { Skill } from './_';
import { move } from './move';
import { check_player_collision } from './check_player_collision';
import { check_game_object_collision } from './check_game_object_collision';
import { update_player_on_orb_destruction } from '../Player/update_player_on_orb_destruction';
import { distance } from '../Helpers/distance';

export function update(gs: GameState): GameState {
    const dt = 1 / TPS;
    let updated_players = gs.players;
    let updated_game_map = gs.game_map;
    const updated_skills = gs.skills.flatMap((skill, id) => {
      if (skill.$ !== 'Projectile') {
        return [[id, skill]];
      }

      skill = move(skill, dt);

      const owner_player = updated_players.get(skill.owner_id);

      updated_players = updated_players.withMutations(mutable_players => {
        mutable_players.forEach((player, player_id) => {
          const [collision_player, collision_skill] = check_player_collision(skill, player, player_id);

          if (collision_player !== player) {
            mutable_players.set(player_id, collision_player);
            skill = collision_skill;

            if (collision_player.life <= 0 && player_id !== skill.owner_id && owner_player) {
              const updated_owner = {
                ...owner_player,
                stats: {
                  ...owner_player.stats,
                  kills: (owner_player.stats.kills || 0) + 1
                }
              };
              mutable_players.set(skill.owner_id, updated_owner);
            }
          }
        });
      });

      updated_game_map = {
        ...updated_game_map,
        objects: updated_game_map.objects.map(game_object => {
          const [updated_game_object, updated_skill] = check_game_object_collision(skill, game_object);

          if (game_object.kind === 'Orb' && game_object.life > 0 && 
              updated_game_object.kind === 'Orb' && updated_game_object.life <= 0 && owner_player) {
            updated_players = update_player_on_orb_destruction(updated_players, owner_player, skill);
          }

          skill = updated_skill;
          return updated_game_object;
        })
      };

      // TODO: enhance calculation
      const distanceToTarget = distance(skill.pos, skill.target);
      const threshold = 2; 
      if (skill.range <= 0 || distanceToTarget <= threshold) {
        return [];
      }

      return [[id, skill]];
    }).toMap() as Map<string, Skill>;

    return {
      ...gs,
      players: updated_players,
      game_map: updated_game_map,
      skills: updated_skills,
    };
  }
