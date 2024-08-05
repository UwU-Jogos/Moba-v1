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

const PRADIUS = 10;

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
    ctx.beginPath();
    ctx.arc(player.pos.x, player.pos.y, PRADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = 'gray';
    ctx.fill();

    // Draw player name
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, player.pos.x, player.pos.y - 20);
  });
}

