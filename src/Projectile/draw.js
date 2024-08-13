"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = void 0;
var circle_1 = require("../Shape/circle");
var consts_1 = require("../Helpers/consts");
var draw_1 = require("../Shape/draw");
var square_1 = require("../Shape/square");
var triangle_1 = require("../Shape/triangle");
function draw(ctx, gs) {
    gs.projectile_system.forEach(function (projectile) {
        switch (projectile.skill_type) {
            case "melee":
                var player = gs.players.get(projectile.owner_id);
                if (player) {
                    (0, draw_1.draw)(ctx, (0, circle_1.circle)(player.pos, projectile.range), "rgba(255, 0, 0, 0.5)");
                }
                break;
            case "target":
                (0, draw_1.draw)(ctx, (0, square_1.square)({
                    x: projectile.target.x - projectile.range / 2,
                    y: projectile.target.y - projectile.range / 2,
                }, projectile.range), "rgba(0, 255, 0, 0.5)");
                break;
            case "action":
                var angle = Math.atan2(projectile.target.y - projectile.pos.y, projectile.target.x - projectile.pos.x);
                var v1 = projectile.pos;
                var v2 = {
                    x: projectile.pos.x + Math.cos(angle - 0.3) * consts_1.PLAYER_RADIUS * 2,
                    y: projectile.pos.y + Math.sin(angle - 0.3) * consts_1.PLAYER_RADIUS * 2,
                };
                var v3 = {
                    x: projectile.pos.x + Math.cos(angle + 0.3) * consts_1.PLAYER_RADIUS * 2,
                    y: projectile.pos.y + Math.sin(angle + 0.3) * consts_1.PLAYER_RADIUS * 2,
                };
                (0, draw_1.draw)(ctx, (0, triangle_1.triangle)(v1, v2, v3), "rgba(0, 0, 255, 0.5)");
                break;
        }
    });
}
exports.draw = draw;
