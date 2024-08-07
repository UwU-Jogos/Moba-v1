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

export function when(when: Action, gs: GameState): GameState {
  let players = gs.players;
  if (!players.has(when.pid)) {
    const initial_name = when.$ === "SetNick" ? when.name : "Anon";
    players = players.set(when.pid, { 
      id: when.pid, 
      name: initial_name, 
      pos: { x: 256, y: 128 }, 
      target_pos: { x: 256, y: 128 }, 
      key: {} 
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

    case "KeyEvent": {
      players = players.update(when.pid, player => {
        if (!player) { return player };
        const newKey = { ...player.key, [when.key]: when.down };
        return { ...player, key: newKey } as Player;
      });
      break;
    }

    case "MouseClick": {
      players = players.update(when.pid, player => {
        if (!player) { return player };
        return { ...player, target_pos: { x: when.x, y: when.y } } as Player;
      });
      break;
    }
  }
  return { ...gs, players };
}
