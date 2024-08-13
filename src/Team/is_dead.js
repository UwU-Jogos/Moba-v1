"use strict";
/// Checks if any player of a specific team is dead.
///
/// # Input
///
/// * `state` - The current game state
/// * `team_type` - The team type to check
///
/// # Output
///
/// Returns a list of players from the specified team that are dead (life <= 0)
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_dead = void 0;
var consts_1 = require("../Helpers/consts");
function is_dead(state, team_type) {
    var result = state.players.filter(function (player) {
        return player.team === team_type && player.life <= 0;
    }).toArray().length == (consts_1.PLAYERS_LIMIT / 2);
    return result;
}
exports.is_dead = is_dead;
