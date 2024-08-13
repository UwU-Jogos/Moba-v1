"use strict";
/// Updates the game state based on an action.
///
/// # Input
///
/// * `action` - The action to be applied to the game state
/// * `gs` - The current game state
///
/// # Output
///
/// Returns the updated GameState after applying the action
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
exports.when = void 0;
var activate_1 = require("../Skill/activate");
var init_1 = require("../Player/init");
function when(when, gs) {
    var players = gs.players;
    if (!players.has(when.pid)) {
        var initial_name = when.$ === "SetNick" ? when.name : "Anon";
        players = players.set(when.pid, (0, init_1.init)(when.pid, initial_name, { x: 128, y: 200 }));
    }
    switch (when.$) {
        case "SetNick": {
            players = players.update(when.pid, function (player) {
                var updatedPlayer = __assign(__assign({}, player), { name: when.name });
                return updatedPlayer;
            });
            break;
        }
        case "SkillEvent": {
            if (when.down) {
                return (0, activate_1.activate)(gs, when.pid, when.key, { x: when.x, y: when.y }, 10);
            }
            break;
        }
        case "MouseClick": {
            players = players.update(when.pid, function (player) {
                if (!player)
                    return player;
                return __assign(__assign({}, player), { target_pos: { x: when.x, y: when.y } });
            });
            break;
        }
    }
    return __assign(__assign({}, gs), { players: players });
}
exports.when = when;
