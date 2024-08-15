/// Matches a Skill with corresponding handlers based on its key.
///
/// # Input
///
/// * `skill` - The Skill to match against
/// * `handlers` - An object containing handler functions for each Skill key
///
/// # Output
///
/// The result of calling the appropriate handler function for the given skill

import { Skill } from './_';
import { V2 } from '../V2/_';
import { Damage } from '../Damage/_';

export function match<R>(
  skill: Skill,
  handlers: {
    Projectile: (damage: Damage, speed: number, range: number, target: V2) => R;
  }
): R {
  switch (skill.$) {
    case 'Projectile':
      return handlers.Projectile(skill.damage, skill.speed, skill.range, skill.target);
  }
}
