"use strict";
/// Initializes the game state.
///
/// # Input
///
/// This function takes no parameters.
///
/// # Output
///
/// Returns an initial GameState with tick set to 0, an empty players map and the initial objects map 
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var immutable_1 = require("immutable");
var init_1 = require("../GameMap/init");
function init() {
    return {
        tick: 0,
        players: (0, immutable_1.Map)(),
        game_map: (0, init_1.init)(),
        projectile_system: (0, immutable_1.Map)()
    };
}
exports.init = init;
