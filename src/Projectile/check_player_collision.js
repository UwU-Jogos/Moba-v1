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
exports.check_player_collision = void 0;
var distance_1 = require("../Helpers/distance");
var consts_1 = require("../Helpers/consts");
var take_damage_1 = require("../Player/take_damage");
function check_player_collision(projectile, player, player_id) {
    if (player_id !== projectile.owner_id) {
        var dist_enemy = projectile.skill_type === 'melee' ? projectile.range * 1.5 : consts_1.PLAYER_RADIUS * 2;
        var dist = parseInt((0, distance_1.distance)(projectile.pos, player.pos).toFixed(2));
        if (dist < dist_enemy) {
            var updatedPlayer = (0, take_damage_1.take_damage)(player, projectile.damage);
            var updatedProjectile = __assign(__assign({}, projectile), { remaining_distance: 0, remaining_duration: 0 });
            return [updatedPlayer, updatedProjectile];
        }
        else {
            return [player, projectile];
        }
    }
    else {
        return [player, projectile];
    }
}
exports.check_player_collision = check_player_collision;
