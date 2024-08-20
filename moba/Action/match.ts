/// Matches an Action with corresponding handlers.
///
/// # Input
///
/// * `action` - The Action to match against
/// * `handlers` - An object containing handler functions for each Action type
///
/// # Output
///
/// The result of calling the appropriate handler function

import { Action } from './_';
import { CharacterType } from '../Character/type';
import { Time } from '@uwu-games/uwu-state-machine';

export function match<R>(
  action: Action,
  handlers: {
    SetNick: (time: number, pid: number, name: string, character: CharacterType) => R;
    SkillEvent: (time: number, pid: number, key: string, down: boolean, x: number, y: number) => R;
    MouseClick: (time: number, pid: number, x: number, y: number) => R;
    MovementEvent: (time: Time, pid: number, key: string, down: boolean) => R;
  }
): R {
  switch (action.$) {
    case 'SetNick':
      return handlers.SetNick(action.time, action.pid, action.name, action.character);
    case 'SkillEvent':
      return handlers.SkillEvent(action.time, action.pid, action.key, action.down, action.x, action.y);
    case 'MouseClick':
      return handlers.MouseClick(action.time, action.pid, action.x, action.y);
    case 'MovementEvent':
      return handlers.MovementEvent(action.time, action.pid, action.key, action.down);
    default:
      throw new Error("Unknown action type");
  }
}