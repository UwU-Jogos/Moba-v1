"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_TO_START_GAME = exports.PLAYERS_LIMIT = exports.PLATFORM_COLOR = exports.WALL_COLOR = exports.ARTIFICIAL_DELAY = exports.PID = exports.PLAYER_INITIAL_LIFE = exports.PLAYER_COLOR = exports.PLAYER_RADIUS = exports.PLAYER_SPEED = exports.TPS = void 0;
exports.TPS = 32;
exports.PLAYER_SPEED = 5;
exports.PLAYER_RADIUS = 10;
exports.PLAYER_COLOR = "#".concat(Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
exports.PLAYER_INITIAL_LIFE = 200;
exports.PID = Math.floor(Math.random() * (Math.pow(2, 16)));
exports.ARTIFICIAL_DELAY = 100;
exports.WALL_COLOR = 'grey';
exports.PLATFORM_COLOR = 'black';
exports.PLAYERS_LIMIT = 4;
exports.TIME_TO_START_GAME = 5;
