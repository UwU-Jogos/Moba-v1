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

export function match<R>(
  action: Action,
  handlers: {
    SetNick: (time: number, pid: number, name: string) => R;
    SkillEvent: (time: number, pid: number, key: string, down: boolean, x: number, y: number) => R;
    MouseClick: (time: number, pid: number, x: number, y: number) => R;
  }
): R {
  switch (action.$) {
    case 'SetNick':
      return handlers.SetNick(action.time, action.pid, action.name);
    case 'SkillEvent':
      return handlers.SkillEvent(action.time, action.pid, action.key, action.down, action.x, action.y);
    case 'MouseClick':
      return handlers.MouseClick(action.time, action.pid, action.x, action.y);
    default:
      throw new Error("Unknown action type");
  }
}
