import { Effect } from '../Effect/_';

// Represents a skill that can be used in the game
// - name: The name of the skill
// - effects: An array of effects that the skill produces when used
export type Skill = {
  name: string;
  effects: Effect<any>[];
}
