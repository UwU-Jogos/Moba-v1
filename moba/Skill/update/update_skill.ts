// Updates a single skill
// - gs: current game state
// - skill: skill to update
// - id: skill id
// = tuple of updated game state and updated skill (or null if skill should be removed)

import { GameState } from "../../GameState/_";
import { Skill } from "../_";
import { TPS } from "../../Helpers/consts";
import { move } from "../move";
import { update_skill_player_collisions } from "./update_skill_player_collisions";
import { update_skill_object_collisions } from "./update_skill_object_collisions";
import { should_remove_skill } from "./should_remove_skill";

export function update_skill(gs: GameState, skill: Skill, id: string): [GameState, [string, Skill] | null] {
  const dt = 1 / TPS;

  const moved_skill = move(skill, dt);
  const [gs_after_player_collisions, skill_after_player_collisions] = update_skill_player_collisions(gs, moved_skill);
  const [gs_after_object_collisions, skill_after_object_collisions] = update_skill_object_collisions(gs_after_player_collisions, skill_after_player_collisions);

  if (should_remove_skill(skill_after_object_collisions)) {
    return [gs_after_object_collisions, null];
  }

  return [gs_after_object_collisions, [id, skill_after_object_collisions]];
}
