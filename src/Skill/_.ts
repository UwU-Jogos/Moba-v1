/// Represents a skill in the game.
///
/// # Description
///
/// Skill is a union type with multiple constructors representing different skills.
///
///

import { UID } from '../UID/_';
import { Damage } from '../Damage/_';

export type Skill =
  | { key: 'Q'; caster: UID; target: UID; damage: Damage; cooldown: number }
  | { key: 'W'; caster: UID; damage: Damage; cooldown: number }


