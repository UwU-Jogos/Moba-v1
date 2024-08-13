"use strict";
/// Restarts the game state.
///
/// # Input
///
/// * `state` - The current GameState
///
/// # Output
///
/// Returns a new GameState with existing players redistributed in quadrants and full life.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restart = void 0;
var init_1 = require("../Game/init");
var init_2 = require("../Player/init");
var get_canvas_dimensions_1 = require("../Helpers/get_canvas_dimensions");
function restart(state) {
    var initial_state = (0, init_1.init)();
    var _a = (0, get_canvas_dimensions_1.get_canvas_dimensions)(), width = _a.width, height = _a.height;
    var quadrant_width = width / 2;
    var quadrant_height = height / 2;
    var players = state.players.withMutations(function (mutable_map) {
        var i = 0;
        mutable_map.forEach(function (player, uid) {
            var quadrant_x = i % 2;
            var quadrant_y = Math.floor(i / 2);
            var pos = {
                x: quadrant_x * quadrant_width + Math.random() * quadrant_width,
                y: quadrant_y * quadrant_height + Math.random() * quadrant_height
            };
            var new_player = (0, init_2.init)(uid, player.name, pos);
            mutable_map.set(uid, new_player);
            i++;
        });
    });
    return __assign(__assign({}, initial_state), { players: players });
}
exports.restart = restart;
