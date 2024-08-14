/// Defines constant values used throughout the game.
///
/// # Exports
///
/// * `TPS` - The rate at which the game updates (ticks per second)
/// * `PLAYER_SPEED` - The movement speed of players
/// * `PLAYER_RADIUS` - The radius of the player's circular representation
/// * `PLAYER_COLOR` - A randomly generated color used to draw players
/// * `PID` - A randomly generated player ID
/// * `ARTIFICIAL_DELAY` - An artificial delay added to actions (in milliseconds)
/// * `WALL_COLOR` - The color used for walls
/// * `PLATFORM_COLOR` - The color used for platforms
/// * `RESPAWN_COLOR` - The color used for respawn area

export const TPS = 32;
export const PLAYER_SPEED = 1.5;
export const PLAYER_RADIUS = 10;
export const PLAYER_COLOR = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
export const PLAYER_INITIAL_LIFE = 150;
export const PID = Math.floor(Math.random() * (2 ** 16));
export const ARTIFICIAL_DELAY = 100;
export const WALL_COLOR = 'grey';
export const PLATFORM_COLOR = 'black';
export const PLAYERS_LIMIT = 2;
export const TIME_TO_START_GAME = 5;
export const DEFAULT_RANGE = 150;
export const RESPAWN_AREA_COLOR = 'green';
export const ORB_COLOR = 'blue';
