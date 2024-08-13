"use strict";
/// Checks if a player is colliding with other player.
///
/// # Args
///
/// * `pid` - The unique identifier of the player
/// * `other_player` - The player we are checking collision against. 
/// * `other_pid` - The pid of other player
/// * `pos` - The old position 
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_collision = void 0;
var consts_1 = require("../Helpers/consts");
function check_collision(pid, other_player, other_pid, pos) {
    var new_x = pos.x;
    var new_y = pos.y;
    if (pid !== other_pid && other_player.life > 0) {
        var dx = new_x - other_player.pos.x;
        var dy = new_y - other_player.pos.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < consts_1.PLAYER_RADIUS * 2) {
            var angle = Math.atan2(dy, dx);
            new_x = other_player.pos.x + Math.cos(angle) * consts_1.PLAYER_RADIUS * 2;
            new_y = other_player.pos.y + Math.sin(angle) * consts_1.PLAYER_RADIUS * 2;
        }
    }
    return { x: new_x, y: new_y };
}
exports.check_collision = check_collision;
