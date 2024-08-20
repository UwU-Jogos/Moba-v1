/// Represents a skill in the game.
///
/// # Description
///
/// Skill is composed of two types: SkillInfo for common properties and SkillType for specific skill properties.
///
/// # Type Definitions

import { Effect } from '../Types/Effect/_';
import { V2 } from '../V2/_';

export type SkillInfo = {
  id: string;
  effects: Effect[];
  pos: V2;
  owner_id: number;
};

export type SkillType =
  | { $: 'Projectile'; damage: number; speed: number; range: number; target: V2, cooldown: number }
  | { $: 'HealArea'; amount: number; radius: number; cooldown: number };

export type Skill = SkillInfo & SkillType;
