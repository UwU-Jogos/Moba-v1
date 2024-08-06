/// Matches a Skill with corresponding handlers.
///
/// # Input
///
/// * `skill` - The Skill to match against
/// * `handlers` - An object containing handler functions for each Skill type
///
/// # Output
///
/// The result of calling the appropriate handler function

import { Skill } from './_';
import { UID } from '../UID/_';
import { Damage } from '../Damage/_';

export function match<R>(
  skill: Skill,
  handlers: {
    Target: (caster: UID, target: UID, damage: Damage, cooldown: number) => R;
    Melee: (caster: UID, damage: Damage, cooldown: number) => R;
  }
): R {
  switch (skill.key) {
    case "Q":
      return handlers.Target(skill.caster, skill.target, skill.damage, skill.cooldown);
    case "W":
      return handlers.Melee(skill.caster, skill.damage, skill.cooldown);
  }
}
