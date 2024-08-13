"use strict";
/// Updates the game state for a single tick.
///
/// # Input
///
/// * `state` - The current game state
///
/// # Output
///
/// Returns the updated GameState after processing a single tick
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
exports.tick = void 0;
var get_canvas_dimensions_1 = require("../Helpers/get_canvas_dimensions");
var consts_1 = require("../Helpers/consts");
var check_collision_1 = require("../Player/check_collision");
var check_game_object_collision_1 = require("../Player/check_game_object_collision");
var move_1 = require("../Projectile/move");
var process_1 = require("../Skill/process");
var check_player_collision_1 = require("../Projectile/check_player_collision");
var is_dead_1 = require("../Team/is_dead");
var type_1 = require("../Team/type");
var restart_1 = require("../GameState/restart");
function tick(gs) {
    if ((0, is_dead_1.is_dead)(gs, type_1.TeamType.TEAM_RED) || (0, is_dead_1.is_dead)(gs, type_1.TeamType.TEAM_BLUE)) {
        return (0, restart_1.restart)(gs);
    }
    var dt = 1 / consts_1.TPS;
    var _a = (0, get_canvas_dimensions_1.get_canvas_dimensions)(), width = _a.width, height = _a.height;
    var interpolation_factor = 0.1;
    // Update projectiles
    var projectile_system = gs.projectile_system.flatMap(function (projectile, id) {
        projectile.remaining_duration -= dt;
        var owner_player = gs.players.get(projectile.owner_id);
        projectile = (0, move_1.move)(projectile, owner_player, dt);
        // Check collisions with players
        gs.players.forEach(function (player, player_id) {
            if (player_id !== projectile.owner_id) {
                var _a = (0, check_player_collision_1.check_player_collision)(projectile, player, player_id), updated_player = _a[0], updated_projectile = _a[1];
                gs.players = gs.players.set(player_id, updated_player);
                projectile = updated_projectile;
            }
        });
        if (projectile &&
            (projectile.remaining_duration <= 0 ||
                (projectile.skill_type === "action" && projectile.remaining_distance <= 0))) {
            return [];
        }
        return [[id, projectile]];
    }).toMap();
    // Update players
    var players = gs.players.map(function (player, uid) {
        if (!player)
            return player;
        var dx = player.target_pos.x - player.pos.x;
        var dy = player.target_pos.y - player.pos.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var new_x = player.pos.x;
        var new_y = player.pos.y;
        if (distance > 0) {
            var move_distance = Math.min(distance, consts_1.PLAYER_SPEED * dt * 128);
            var ratio = move_distance / distance;
            new_x = player.pos.x + dx * ratio * interpolation_factor;
            new_y = player.pos.y + dy * ratio * interpolation_factor;
            gs.players.forEach(function (other_player, other_uid) {
                var result_pos = (0, check_collision_1.check_collision)(uid, other_player, other_uid, { x: new_x, y: new_y });
                new_x = result_pos.x;
                new_y = result_pos.y;
            });
            new_x = Math.max(consts_1.PLAYER_RADIUS, Math.min(width - consts_1.PLAYER_RADIUS, new_x));
            new_y = Math.max(consts_1.PLAYER_RADIUS, Math.min(height - consts_1.PLAYER_RADIUS, new_y));
        }
        // Skill logic
        var active_skills = __assign({}, player.active_skills);
        Object.entries(active_skills).forEach(function (_a) {
            var skill_id = _a[0], end_tick = _a[1];
            (0, process_1.process_player_skills)(gs.tick, end_tick, skill_id, player, uid);
        });
        // Check collision with GameObjects
        gs.game_map.objects.forEach(function (game_object) {
            var result_pos = (0, check_game_object_collision_1.check_game_object_collision)(player, { x: new_x, y: new_y }, game_object);
            new_x = result_pos.x;
            new_y = result_pos.y;
        });
        // Clamp to canvas boundaries
        new_x = Math.max(consts_1.PLAYER_RADIUS, Math.min(width - consts_1.PLAYER_RADIUS, new_x));
        new_y = Math.max(consts_1.PLAYER_RADIUS, Math.min(height - consts_1.PLAYER_RADIUS, new_y));
        return __assign(__assign({}, player), { pos: { x: new_x, y: new_y }, active_skills: active_skills });
    }).toMap();
    return __assign(__assign({}, gs), { tick: gs.tick + 1, players: players, projectile_system: projectile_system });
}
exports.tick = tick;
