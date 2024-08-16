// Updates skill-object collisions
// - gs: current game state
// - skill: skill to check collisions for
// = updated game state and updated skill

import { GameState } from "../../GameState/_";
import { GameObject } from "../../GameMap/GameObject/_";
import { Skill } from "../_";
import { check_game_object_collision } from "../check_game_object_collision";
import { update_player_on_orb_destruction } from "../../Player/update_player_on_orb_destruction";

export function update_skill_object_collisions(gs: GameState, skill: Skill): [GameState, Skill] {
  let updated_gs   = gs;
  let updated_skill = skill;

  const [new_gs, new_skill] = updated_gs.game_map.objects.reduce(
    ([acc_gs, acc_skill], game_object: GameObject) => {
      const [updated_game_object, collision_skill] = check_game_object_collision(acc_skill, game_object);

      if (game_object.kind === 'Orb' && game_object.life > 0 && 
          updated_game_object.kind === 'Orb' && updated_game_object.life <= 0) {

        const owner_player = acc_gs.players.get(acc_skill.owner_id);
        if (owner_player) {
          const updated_players = update_player_on_orb_destruction(acc_gs.players, owner_player, acc_skill);
          acc_gs = {
            ...acc_gs,
            players: updated_players
          };
        }
      }

      return [
        {
          ...acc_gs,
          game_map: {
            ...acc_gs.game_map,
            objects: acc_gs.game_map.objects.map(obj => 
              obj === game_object ? updated_game_object : obj
            )
          }
        },
        collision_skill
      ];
    },
    [updated_gs, updated_skill]
  );

  return [new_gs, new_skill];
}
