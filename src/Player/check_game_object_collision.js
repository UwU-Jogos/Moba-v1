"use strict";
/// Checks if a player is colliding with some game_object.
///
/// # Args
///
/// * `pid` - The unique identifier of the player
/// * `other_player` - The player we are checking collision against. 
/// * `other_pid` - The pid of other player
/// * `pos` - The old position
///
/// # Return
/// The new position after resolving collision with any game object
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_game_object_collision = void 0;
var consts_1 = require("../Helpers/consts");
function check_game_object_collision(player, pos, game_object) {
    var new_x = pos.x;
    var new_y = pos.y;
    if (game_object.kind === 'Wall' || game_object.kind === 'Platform') {
        var left = game_object.position.x;
        var right = game_object.position.x + game_object.width;
        var top_1 = game_object.position.y;
        var bottom = game_object.position.y + game_object.height;
        // Check if player is colliding with the object
        if (new_x + consts_1.PLAYER_RADIUS > left && new_x - consts_1.PLAYER_RADIUS < right &&
            new_y + consts_1.PLAYER_RADIUS > top_1 && new_y - consts_1.PLAYER_RADIUS < bottom) {
            // Resolve collision
            if (Math.abs(player.pos.x - left) <= consts_1.PLAYER_RADIUS)
                new_x = left - consts_1.PLAYER_RADIUS;
            if (Math.abs(player.pos.x - right) <= consts_1.PLAYER_RADIUS)
                new_x = right + consts_1.PLAYER_RADIUS;
            if (Math.abs(player.pos.y - top_1) <= consts_1.PLAYER_RADIUS)
                new_y = top_1 - consts_1.PLAYER_RADIUS;
            if (Math.abs(player.pos.y - bottom) <= consts_1.PLAYER_RADIUS)
                new_y = bottom + consts_1.PLAYER_RADIUS;
        }
    }
    return { x: new_x, y: new_y };
}
exports.check_game_object_collision = check_game_object_collision;
