import { basic } from "../Skill/basic";
import { UID } from "../UID/_";
import { Damage } from "../Damage/_";
import { V2 } from "../V2/_";
import { Projectile } from "./_";

export function create(skill: basic, owner_id: UID, pos: V2, target: V2, damage: Damage): [string, Projectile] {
  const id = `${skill.id}-${owner_id}-${Date.now()}`;
  return [id, {
    id,
    skill_type: skill.type,
    owner_id,
    pos: {... pos},
    target,
    remaining_distance: skill.range,
    remaining_duration: skill.duration,
    speed: skill.range / skill.duration,
    range: skill.range,
    damage: damage
  }];
}
