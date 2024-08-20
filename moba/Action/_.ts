/// Represents an action in the game.
///
/// # Description
///
/// Action is a union type with four constructors: SetNick, SkillEvent, MouseClick, and MovementEvent.
///
/// # Constructors
///
/// * `SetNick` - Action to set a player's nickname
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `name` - The new nickname for the player
///   - `character` - The character type of the player
///
/// * `SkillEvent` - Action for a skill activation event
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `key` - The key associated with the skill
///   - `down` - Whether the key is pressed down (true) or released (false)
///   - `x` - The x-coordinate of the target position
///   - `y` - The y-coordinate of the target position
///
/// * `MouseClick` - Action for a mouse click event
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `x` - The x-coordinate of the mouse click
///   - `y` - The y-coordinate of the mouse click
///
/// * `MovementEvent` - Action for a movement key press or release event
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `key` - The key involved in the movement event
///   - `down` - Whether the key is pressed down (true) or released (false)

import { Time } from '@uwu-games/uwu-state-machine';
import { CharacterType } from '../Character/type';

export type Action =
  | { $: 'SetNick'; time: number; pid: number; name: string, character: CharacterType }
  | { $: 'SkillEvent'; time: number; pid: number; key: string; down: boolean; x: number; y: number }
  | { $: 'MouseClick'; time: number; pid: number; x: number; y: number }
  | { $: 'MovementEvent'; time: Time; pid: number; key: string; down: boolean };
