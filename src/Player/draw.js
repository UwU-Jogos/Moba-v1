"use strict";
/// Draws a Player.
///
/// # Input
///
/// * `ctx` - The rendering context
/// * `player` - The Player to be drawn
///
/// # Output
///
/// Renders the Player on the canvas
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = void 0;
var circle_1 = require("../Shape/circle");
var draw_1 = require("../Shape/draw");
var consts_1 = require("../Helpers/consts");
var type_1 = require("../Team/type");
function draw(ctx, player) {
    if (player.life <= 0) {
        return;
    }
    ctx.fillStyle = 'gray';
    ctx.fill(new Path2D());
    var teamColor = player.team === type_1.TeamType.TEAM_RED ? 'red' : 'blue';
    (0, draw_1.draw)(ctx, (0, circle_1.circle)(player.pos, consts_1.PLAYER_RADIUS), teamColor);
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, player.pos.x, player.pos.y - 20);
    var life_bar_width = 40;
    var life_bar_height = 5;
    var life_bar_x = player.pos.x - life_bar_width / 2;
    var life_bar_y = player.pos.y + 20;
    var life_percentage = (player.life / consts_1.PLAYER_INITIAL_LIFE);
    ctx.fillStyle = 'red';
    ctx.fillRect(life_bar_x, life_bar_y, life_bar_width, life_bar_height);
    ctx.fillStyle = 'green';
    ctx.fillRect(life_bar_x, life_bar_y, life_bar_width * life_percentage, life_bar_height);
}
exports.draw = draw;
