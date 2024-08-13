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
import { activate as activate_skill} from '../Skill/activate';
import { init as init_player } from '../Player/init';
import { CharacterType } from '../Character/type';

export function when(action: Action, gs: GameState): GameState {
  let players = gs.players;

  if (!players.has(action.pid)) {
    const initial_name = action.$ === "SetNick" ? action.name : "Anon";
    const character_type = action.$ === "SetNick" ? action.character : CharacterType.TRIANGLE;
    players = players.set(action.pid, init_player(action.pid, initial_name, character_type));
  }

  switch (action.$) {
    case "SetNick": {
      players = players.update(action.pid, player => {
        const updatedPlayer = { ...player, name: action.name } as Player;
        return updatedPlayer;
      });
      break;
    }

    case "SkillEvent": {
      if (action.down) {
        return activate_skill(gs, action.pid, action.key, { x: action.x, y: action.y }, 10);
      }
      break;
    }
    case "MouseClick": {
      players = players.update(action.pid, player => {
        if (!player) return player;
        return { ...player, target_pos: { x: action.x, y: action.y } } as Player;
      });
      break;
    }
    case "MovementEvent": {
      players = players.update(action.pid, player => {
        if (!player) return player;
        return { ...player, key: { ...player.key, [action.key]: action.down } } as Player;
      });
      break;
    }
  }
  return { ...gs, players };
}
