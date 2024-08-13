"use strict";
/// Draws the current game state on the screen.
///
/// # Input
///
/// * `state` - The current game state to be drawn
///
/// # Output
///
/// This function doesn't return a value, it performs the drawing operation.
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = void 0;
var draw_1 = require("../GameMap/GameObject/draw");
var draw_2 = require("../Projectile/draw");
var draw_3 = require("../Player/draw");
function draw(gs) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    // Clear the canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gs.game_map.objects.forEach(function (game_object) {
        (0, draw_1.draw)(ctx, game_object);
    });
    gs.players.forEach(function (player) {
        (0, draw_3.draw)(ctx, player);
    });
    (0, draw_2.draw)(ctx, gs);
}
exports.draw = draw;
