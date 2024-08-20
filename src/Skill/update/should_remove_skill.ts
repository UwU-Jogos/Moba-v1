import { Skill } from "../_";
import { match } from "../match";
import { distance } from "../../V2/distance";

// Checks if a skill should be removed
// - skill: the skill to check
// = true if the skill should be removed, false otherwise
export function should_remove_skill(skill: Skill): boolean {
  return match(skill, {
    Projectile: (damage, speed, range, target) => {
      var distance_to_target = distance(skill.pos, target);
      var threshold          = 5;
      return range <= 0 || distance_to_target <= threshold;
    },
    HealArea: (amount, radius) => {
      return radius <= 0;
    },
  });
}
