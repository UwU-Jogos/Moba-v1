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
import { PLAYER_RADIUS, PLAYER_INITIAL_LIFE } from '../Helpers/consts';
import { init as init_player } from '../Player/init';
import { CharacterType } from '../Character/type';

export function when(when: Action, gs: GameState): GameState {
  let players = gs.players;

  if (!players.has(when.pid)) {
    const initial_name = when.$ === "SetNick" ? when.name : "Anon";
    players = players.set(when.pid, init_player(when.pid, initial_name, { x: 128, y: 200 }, CharacterType.TRIANGLE));
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
        return activate_skill(gs, when.pid, when.key, { x: when.x, y: when.y }, 10);
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
    case "MovementEvent": {
      players = players.update(when.pid, player => {
        if (!player) return player;
        return { ...player, key: { ...player.key, [when.key]: when.down } } as Player;
      });
      break;
    }
  }
  return { ...gs, players };
}
