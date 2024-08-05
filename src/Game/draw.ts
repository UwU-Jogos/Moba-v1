/// Draws the current game state on the screen.
///
/// # Input
///
/// * `state` - The current game state to be drawn
///
/// # Output
///
/// This function doesn't return a value, it performs the drawing operation.

import { GameState } from '../GameState/_';
import { PLAYER_RADIUS, PLAYER_COLOR } from '../Helpers/consts';
import { circle } from '../Shape/circle';
import { draw as drawShape } from '../Shape/draw';

export function draw(gs: GameState): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear the canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the player as a filled gray circle, centered around their pos, with the name in a small font above the circle
  gs.players.forEach(player => {
    // Draw player circle
    ctx.fillStyle = 'gray';
    ctx.fill(new Path2D());

    drawShape(ctx, circle(player.pos, PLAYER_RADIUS), PLAYER_COLOR);

    // Draw player name
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, player.pos.x, player.pos.y - 20);
  });
}
