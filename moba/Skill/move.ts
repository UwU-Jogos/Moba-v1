/// Moves a projectile skill or updates HealArea position.
///
/// # Input
///
/// * `skill` - The Skill to move or update
/// * `delta_time` - The time elapsed since the last update
///
/// # Output
///
/// A new Skill with updated position

import { Skill } from './_';
import { match } from './match';
import { normalize } from '../V2/normalize';
import { scale } from '../V2/scale';
import { add } from '../V2/add';

export function move(skill: Skill, delta_time: number): Skill {
  const SPEED_MULTIPLIER = 10;

  return match(skill, {
    Projectile: (damage, speed, range, target) => {
      const direction = normalize({
        x: target.x - skill.pos.x,
        y: target.y - skill.pos.y
      });
      const distance = speed * delta_time * SPEED_MULTIPLIER;
      const movement = scale(direction, distance);
      const new_pos = add(skill.pos, movement);

      return {
        ...skill,
        pos: new_pos,
        range: range - distance
      };
    },
    HealArea: (heal_amount, radius) => { return skill; },
  });
}
