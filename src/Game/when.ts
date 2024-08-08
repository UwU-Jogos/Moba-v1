/// Updates the game state based on an action.
///
/// # Input
///
/// * `action` - The action to be applied to the game state
/// * `gs` - The current game state
///
/// # Output
///
/// Returns the updated GameState after applying the action

import { Action } from '../Action/_';
import { GameState } from '../GameState/_';
import { Player } from '../Player/_';
import { seconds_to_ticks } from '../Helpers/seconds_to_ticks';
import { activate as activate_skill} from '../Skill/activate';
import { PLAYER_RADIUS } from '../Helpers/consts';


export function when(when: Action, gs: GameState): GameState {
  let players = gs.players;

  if (!players.has(when.pid)) {
    const initial_name = when.$ === "SetNick" ? when.name : "Anon";
    players = players.set(when.pid, { 
      id: when.pid, 
      name: initial_name, 
      pos: { x: 256, y: 128 }, 
      target_pos: { x: 256, y: 128 },
      skills: {
        'Q': { id: 'skill1', type: 'melee', cooldown: seconds_to_ticks(1), duration: 1, range: PLAYER_RADIUS * 2 },
        'W': { id: 'skill2', type: 'target', cooldown: seconds_to_ticks(1), duration: 1, range: PLAYER_RADIUS * 2 },
        'E': { id: 'skill3', type: 'action', cooldown: seconds_to_ticks(0.25), duration: 1, range: 200 },
      },
      activeSkills: {}
    });
  }

  switch (when.$) {
    case "SetNick": {
      players = players.update(when.pid, player => {
        const updatedPlayer = { ...player, name: when.name } as Player;
        return updatedPlayer;
      });
      break;
    }

    case "SkillEvent": {
      if (when.down) {
        return activate_skill(gs, when.pid, when.key, { x: when.x, y: when.y });
      }
      break;
    }
    case "MouseClick": {
      players = players.update(when.pid, player => {
        if (!player) return player;
        return { ...player, target_pos: { x: when.x, y: when.y } } as Player;
      });
      break;
    }
  }
  return { ...gs, players };
}