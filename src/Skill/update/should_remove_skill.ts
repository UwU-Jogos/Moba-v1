// Checks if a skill should be removed
// - skill: the skill to check
// = true if the skill should be removed, false otherwise

import { Skill } from "../_";
import { distance } from "../../V2/distance";

export function should_remove_skill(skill: Skill): boolean {
  if (skill.$ !== 'Projectile') return false;
  
  const distance_to_target = distance(skill.pos, skill.target);
  const threshold = 5;
  return skill.range <= 0 || distance_to_target <= threshold;
}
