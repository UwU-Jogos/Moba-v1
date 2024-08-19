import { GameState } from "../../GameState/_";
import { Skill } from "../_";
import { Player } from "../../Player/_";
import { UID } from "../../Types/UID/_";
import { check_player_collision } from "../check_player_collision";
import { Map } from "immutable";

// Updates skill-player collisions
// - gs: current game state
// - skill: skill to check collisions for
// = tuple of updated game state and updated skill
export function update_skill_player_collisions(gs: GameState, skill: Skill): [GameState, Skill] {
  const initial_state: [Map<UID, Player>, Skill] = [gs.players, skill];

  const [updated_players, updated_skill] = gs.players.reduce(
    ([acc_players, acc_skill]: [Map<UID, Player>, Skill], player: Player, player_id: UID) => {
      const [collision_player, collision_skill] = check_player_collision(acc_skill, player, player_id);

      if (collision_player === player) {
        return [acc_players, acc_skill];
      }

      let new_players = acc_players.set(player_id, collision_player);

      if (collision_player.life <= 0 && player_id !== collision_skill.owner_id) {
        const owner_player = acc_players.get(collision_skill.owner_id);
        if (owner_player) {
          const updated_owner = {
            ...owner_player,
            stats: {
              ...owner_player.stats,
              kills: (owner_player.stats.kills || 0) + 1
            }
          };
          new_players = new_players.set(collision_skill.owner_id, updated_owner);
        }
      }

      return [new_players, collision_skill];
    },
    initial_state
  );

  const updated_gs = {
    ...gs,
    players: updated_players
  };

  return [updated_gs, updated_skill];
}
