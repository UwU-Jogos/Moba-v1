"use strict";
/// Represents an action in the game.
///
/// # Description
///
/// Action is a union type with three constructors: SetNick, KeyEvent, and MouseClick.
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
///
/// * `MouseClick` - Action for a mouse click event
///   - `time` - The time of the action
///   - `pid` - The player's unique identifier
///   - `x` - The x-coordinate of the mouse click
///   - `y` - The y-coordinate of the mouse click
Object.defineProperty(exports, "__esModule", { value: true });
