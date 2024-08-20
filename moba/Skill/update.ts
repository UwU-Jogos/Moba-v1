// Updates all skills in the game state
// - gs: current game state
// = updated game state with updated skills

import { GameState } from '../GameState/_';
import { Map } from 'immutable';
import { Skill } from './_';
import { update_skill } from './update/update_skill';

export function update(gs: GameState): GameState {
  const [updated_gs, updated_skills] = gs.skills.reduce(
    ([acc_gs, acc_skills], skill, id) => {
      const [new_gs, new_skill] = update_skill(acc_gs, skill, id);
      return [new_gs, new_skill ? acc_skills.set(id, new_skill[1]) : acc_skills.remove(id)];
    },
    [gs, Map<string, Skill>()]
  );

  return {
    ...updated_gs,
    skills: updated_skills,
  };
}
