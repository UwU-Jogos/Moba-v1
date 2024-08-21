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
import { init as init_player } from '../Player/init';

export function when(action: Action, gs: GameState): GameState {
  let players = gs.players;

  if (!players.has(action.pid)) {
    const initial_name = action.$ === "SetNick" ? action.name : "Anon";
    players = players.set(action.pid, init_player(action.pid, initial_name));
  }

  switch (action.$) {
    case "SetNick": {
      players = players.update(action.pid, player => {
        if (!player) return player;
        return { ...player, name: action.name } as Player;
      });
      break;
    }

    case "SkillEvent": {
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
