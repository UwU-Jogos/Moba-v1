import { Effect } from '../Effect/_';
import { V2 } from '../../base/V2/_';

// Represents a skill in the game
// - id: unique identifier for the skill
// - effects: list of effects that the skill produces when cast
// The effects can be of different types
export type Skill = {
  id: string;
  effects: Effect<any>[];
};

// Represents a skill being cast
// - skill: the skill being cast
// - position: the position where the skill is being cast
// - owner_id: the unique identifier of the player casting the skill
export type SkillCast = {
  skill: Skill;
  position: V2;
  owner_id: string;
};
