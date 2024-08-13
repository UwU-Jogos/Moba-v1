"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_player_skills = void 0;
function process_player_skills(state_tick, end_tick, skill_id, player, pid) {
    if (state_tick >= end_tick) {
        delete player.active_skills[skill_id];
    }
    else {
        var skill = Object.values(player.skills).find(function (s) { return s.id === skill_id; });
        if (skill) {
            switch (skill.type) {
                case "melee":
                    // Apply melee effect (e.g., damage nearby players)
                    console.log("Player ".concat(pid, " hit with melee skill"));
                    break;
                case "target":
                    // Apply target effect (e.g., heal or buff self)
                    console.log("Player ".concat(pid, " used target skill on self"));
                    break;
                case "action":
                    // Move projectile or apply continuous effect
                    console.log("Player ".concat(pid, " is using action skill"));
                    break;
            }
        }
    }
}
exports.process_player_skills = process_player_skills;
