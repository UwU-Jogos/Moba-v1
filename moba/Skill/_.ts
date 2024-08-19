/// Represents a skill in the game.
///
/// # Description
///
/// Skill is composed of two types: SkillInfo for common properties and SkillType for specific skill properties.
///
/// # Type Definitions

import { Effect } from '../Effect/_';
import { V2 } from '../V2/_';
import { UID } from '../UID/_';
import { Key } from '../../base/Types/Key/_';
import { Damage } from '../Damage/_';

export type SkillInfo = {
  id: string;
  effects: Effect[];
  pos: V2;
  owner_id: UID;
};

export type SkillType =
  | { $: 'Projectile'; damage: Damage; speed: number; range: number; target: V2, cooldown: number }
  | { $: 'HealArea'; amount: number; radius: number; cooldown: number };

export type Skill = SkillInfo & SkillType;
