/// Returns a default skill for a given key.
///
/// # Input
///
/// * `key` - The key associated with the skill (e.g., 'Q' or 'W')
/// * `caster` - The UID of the skill caster
/// * `pos` - The position of the skill
///
/// # Output
///
/// A default Skill object for the given key

import { Skill } from './_';
import { UID } from '../UID/_';
import { Damage } from '../Damage/_';
import { V2 } from '../V2/_';

export function build_skill(key: 'Q' | 'W', caster: UID, pos: V2): Skill {
  const defaultUID: UID = 0;
  const defaultDamage: Damage = 10;
  const defaultCooldown: number = 5;

  switch (key) {
    case 'Q':
      return {
        key: 'Q',
        caster: caster,
        target: defaultUID,
        damage: defaultDamage,
        cooldown: defaultCooldown,
        pos: pos
      };
    case 'W':
      return {
        key: 'W',
        caster: caster,
        damage: defaultDamage,
        cooldown: defaultCooldown,
        pos: pos
      };
  }
}
