"use strict";
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
exports.activate = void 0;
var create_1 = require("../Projectile/create");
// Update the activateSkill function
function activate(gs, player_id, skill_key, target_pos, damage) {
    var _a;
    var player = gs.players.get(player_id);
    if (!player)
        return gs;
    var skill = player.skills[skill_key];
    if (!skill)
        return gs;
    var current_tick = gs.tick;
    if (player.active_skills[skill.id] && current_tick < player.active_skills[skill.id]) {
        console.log("Skill is still on cooldown", player.active_skills[skill.id]);
        return gs;
    }
    // Activate the skill
    var _b = (0, create_1.create)(skill, player_id, player.pos, target_pos, damage), id = _b[0], new_projectile = _b[1];
    var new_projectile_system = gs.projectile_system.set(id, new_projectile);
    // Update the skill cooldown
    var new_active_skills = __assign(__assign({}, player.active_skills), (_a = {}, _a[skill.id] = current_tick + skill.cooldown, _a));
    var updated_player = __assign(__assign({}, player), { active_skills: new_active_skills });
    var new_players = gs.players.set(player_id, updated_player);
    return __assign(__assign({}, gs), { players: new_players, projectile_system: new_projectile_system });
}
exports.activate = activate;
