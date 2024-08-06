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
import { V2 } from '../V2/_';

export function match<R>(
  action: Action,
  handlers: {
    SetNick: (time: number, pid: number, name: string) => R;
    KeyEvent: (time: number, pid: number, key: string, down: boolean, mouse_pos: V2) => R;
    MouseClick: (time: number, pid: number, x: number, y: number) => R;
  }
): R {
  switch (action.$) {
    case 'SetNick':
      return handlers.SetNick(action.time, action.pid, action.name);
    case 'KeyEvent':
      return handlers.KeyEvent(action.time, action.pid, action.key, action.down, action.mouse_pos);
    case 'MouseClick':
      return handlers.MouseClick(action.time, action.pid, action.x, action.y);
  }
}
