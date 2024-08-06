/// Represents an action in the game.
///
/// # Description
///
/// Action is a union type with two constructors: SetNick and KeyEvent.
///
/// # Constructors
///
/// * `SetNick` - Action to set a player's nickname
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `name` - The new nickname for the player
///
/// * `KeyEvent` - Action for a key press or release event
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `key` - The key involved in the event
///   - `down` - Whether the key is pressed down (true) or released (false)

import { Time } from '@uwu-games/uwu-state-machine';
import { UID } from '../UID/_';
import { Key } from '../Key/_';

export type Action =
  | { $: 'SetNick'; time: Time; pid: UID; name: string }
  | { $: 'KeyEvent'; time: Time; pid: UID; key: Key; down: boolean }
  | { $: 'MouseClick'; time: Time; pid: UID; x: number; y: number };
