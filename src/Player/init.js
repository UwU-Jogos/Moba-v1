"use strict";
/// Initializes a new player.
///
/// # Input
///
/// * `id` - The unique identifier for the player
/// * `name` - The name of the player
/// * `pos` - The initial position of the player
///
/// # Output
///
/// A new Player object with initialized properties
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var type_1 = require("../Team/type");
var consts_1 = require("../Helpers/consts");
var consts_2 = require("../Helpers/consts");
var seconds_to_ticks_1 = require("../Helpers/seconds_to_ticks");
var next_team = type_1.TeamType.TEAM_RED;
function init(id, name, pos) {
    var initial_player = {
        id: id,
        name: name,
        pos: pos,
        target_pos: pos,
        skills: {
            'Q': { id: 'skill1', type: 'melee', cooldown: (0, seconds_to_ticks_1.seconds_to_ticks)(1), duration: 1, range: consts_2.PLAYER_RADIUS * 2 },
            'W': { id: 'skill2', type: 'target', cooldown: (0, seconds_to_ticks_1.seconds_to_ticks)(1), duration: 1, range: consts_2.PLAYER_RADIUS * 2 },
            'E': { id: 'skill3', type: 'action', cooldown: (0, seconds_to_ticks_1.seconds_to_ticks)(0.25), duration: 1, range: 200 },
        },
        active_skills: {},
        life: consts_1.PLAYER_INITIAL_LIFE,
        team: next_team
    };
    next_team = (next_team == type_1.TeamType.TEAM_RED) ? type_1.TeamType.TEAM_BLUE : type_1.TeamType.TEAM_RED;
    return initial_player;
}
exports.init = init;
