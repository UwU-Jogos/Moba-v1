import { GameState } from '../GameState/_';
import { Map } from 'immutable';
import { TPS } from '../Helpers/consts';
import { Skill } from './_';
import { move } from './move';
import { check_player_collision } from './check_player_collision';
import { check_game_object_collision } from './check_game_object_collision';
import { update_player_on_orb_destruction } from '../Player/update_player_on_orb_destruction';
import { distance } from '../Helpers/distance';

// Updates a single skill
// - gs: current game state
// - skill: skill to update
// - id: skill id
// = tuple of updated game state and updated skill (or null if skill should be removed)
function update_skill(gs: GameState, skill: Skill, id: string): [GameState, [string, Skill] | null] {
  const dt = 1 / TPS;

  switch (skill.$) {
    case "Projectile": {
      const moved_skill = move(skill, dt);
      const [gs_after_player_collisions, skill_after_player_collisions] = update_skill_player_collisions(gs, moved_skill);
      const [gs_after_object_collisions, skill_after_object_collisions] = update_skill_object_collisions(gs_after_player_collisions, skill_after_player_collisions);
      
      if (should_remove_skill(skill_after_object_collisions)) {
        return [gs_after_object_collisions, null];
      }
      
      return [gs_after_object_collisions, [id, skill_after_object_collisions]];
    }
    default: {
      return [gs, [id, skill]];
    }
  }
}

// Updates skill-player collisions
// - gs: current game state
// - skill: skill to check collisions for
// = tuple of updated game state and updated skill
function update_skill_player_collisions(gs: GameState, skill: Skill): [GameState, Skill] {
  let updated_gs = gs;
  let updated_skill = skill;

  updated_gs = {
    ...updated_gs,
    players: updated_gs.players.withMutations(mutable_players => {
      mutable_players.forEach((player, player_id) => {
        const [collision_player, collision_skill] = check_player_collision(updated_skill, player, player_id);

        if (collision_player !== player) {
          mutable_players.set(player_id, collision_player);
          updated_skill = collision_skill;

          if (collision_player.life <= 0 && player_id !== updated_skill.owner_id) {
            const owner_player = mutable_players.get(updated_skill.owner_id);
            if (owner_player) {
              const updated_owner = {
                ...owner_player,
                stats: {
                  ...owner_player.stats,
                  kills: (owner_player.stats.kills || 0) + 1
                }
              };
              mutable_players.set(updated_skill.owner_id, updated_owner);
            }
          }
        }
      });
    })
  };

  return [updated_gs, updated_skill];
}

// Updates skill-object collisions
// - gs: current game state
// - skill: skill to check collisions for
// = tuple of updated game state and updated skill
function update_skill_object_collisions(gs: GameState, skill: Skill): [GameState, Skill] {
  let updated_gs = gs;
  let updated_skill = skill;

  updated_gs = {
    ...updated_gs,
    game_map: {
      ...updated_gs.game_map,
      objects: updated_gs.game_map.objects.map(game_object => {
        const [updated_game_object, collision_skill] = check_game_object_collision(updated_skill, game_object);

        if (game_object.kind === 'Orb' && game_object.life > 0 && 
            updated_game_object.kind === 'Orb' && updated_game_object.life <= 0) {
          const owner_player = updated_gs.players.get(updated_skill.owner_id);
          if (owner_player) {
            updated_gs = {
              ...updated_gs,
              players: update_player_on_orb_destruction(updated_gs.players, owner_player, updated_skill)
            };
          }
        }

        updated_skill = collision_skill;
        return updated_game_object;
      })
    }
  };

  return [updated_gs, updated_skill];
}

// Checks if a skill should be removed
// - skill: skill to check
// = true if skill should be removed, false otherwise
function should_remove_skill(skill: Skill): boolean {
  if (skill.$ !== 'Projectile') return false;
  
  const distance_to_target = distance(skill.pos, skill.target);
  const threshold = 2;
  return skill.range <= 0 || distance_to_target <= threshold;
}

// Updates all skills in the game state
// - gs: current game state
// = updated game state with updated skills
export function update(gs: GameState): GameState {
  const [updated_gs, updated_skills] = gs.skills.reduce(
    ([acc_gs, acc_skills], skill, id) => {
      const [new_gs, new_skill] = update_skill(acc_gs, skill, id);
      return [new_gs, new_skill ? acc_skills.set(id, new_skill[1]) : acc_skills.remove(id)];
    },
    [gs, Map<string, Skill>()]
  );

  return {
    ...updated_gs,
    skills: updated_skills,
  };
}
