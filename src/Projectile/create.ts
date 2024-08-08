import { basic } from "../Skill/basic";
import { UID } from "../UID/_";
import { V2 } from "../V2/_";
import { Projectile } from "./_";

// Update the createProjectile function to return a tuple of [id, Projectile]
export function create(skill: basic, ownerId: UID, pos: V2, target: V2): [string, Projectile] {
  const id = `${skill.id}-${ownerId}-${Date.now()}`;
  return [id, {
    id,
    skillType: skill.type,
    ownerId,
    pos: {... pos},
    target,
    remainingDistance: skill.range,
    remainingDuration: skill.duration,
    speed: skill.range / skill.duration,
    range: skill.range,
  }];
}
