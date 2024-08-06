/// Defines constant values used throughout the game.
///
/// # Exports
///
/// * `TPS` - The rate at which the game updates (ticks per second)
/// * `PLAYER_SPEED` - The movement speed of players
/// * `PLAYER_RADIUS` - The radius of the player's circular representation
/// * `PLAYER_COLOR` - The color used to draw players

export const TPS = 32;
export const PLAYER_SPEED = 5;
export const PLAYER_RADIUS = 10;
export const PLAYER_COLOR = '#FF0000';
export const PID = Math.floor(Math.random() * (2 ** 16));
export const ARTIFICIAL_DELAY = 100;
