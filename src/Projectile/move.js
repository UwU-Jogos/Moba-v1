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
exports.move = void 0;
var distance_1 = require("../Helpers/distance");
function move(projectile, owner_player, dt) {
    var updated_projectile = __assign({}, projectile);
    switch (updated_projectile.skill_type) {
        case "melee":
            if (owner_player) {
                updated_projectile.pos = __assign({}, owner_player.pos);
            }
            break;
        case "target":
            updated_projectile.pos = __assign({}, updated_projectile.target);
            break;
        case "action":
            var distance_to_target = (0, distance_1.distance)(updated_projectile.pos, updated_projectile.target);
            if (distance_to_target > 0 && updated_projectile.remaining_distance > 0) {
                var move_distance = Math.min(distance_to_target, updated_projectile.speed * dt, updated_projectile.remaining_distance);
                var ratio = move_distance / distance_to_target;
                updated_projectile.pos.x += (updated_projectile.target.x - updated_projectile.pos.x) * ratio;
                updated_projectile.pos.y += (updated_projectile.target.y - updated_projectile.pos.y) * ratio;
                updated_projectile.remaining_distance -= move_distance;
                if (move_distance >= distance_to_target) {
                    updated_projectile.pos = __assign({}, updated_projectile.target);
                    updated_projectile.remaining_distance = 0;
                }
            }
            break;
    }
    return updated_projectile;
}
exports.move = move;
