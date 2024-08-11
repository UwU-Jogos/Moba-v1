/// Draws the player's stats on the canvas.
///
/// # Input
///
/// * `ctx` - The canvas rendering context
/// * `stats` - The Stats object to be drawn
/// * `position` - The position to draw the stats box
///
/// # Output
///
/// This function doesn't return a value, but draws the stats on the canvas

import { Stats } from './_';
import { V2 } from '../V2/_';

export function draw(ctx: CanvasRenderingContext2D, stats: Stats, position: V2): void {
  const boxWidth = 100;
  const boxHeight = 80;
  const padding = 5;

  // Draw the box
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(position.x, position.y, boxWidth, boxHeight);

  // Draw the stats text
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Kills: ${stats.kills}`, position.x + padding, position.y + padding + 12);
  ctx.fillText(`Lives: ${stats.lifes}`, position.x + padding, position.y + padding + 26);
  ctx.fillText(`Orbs: ${stats.destroyed_orbs}`, position.x + padding, position.y + padding + 40);
  ctx.fillText(`Dmg Mult: ${stats.damage_multiplier.toFixed(2)}`, position.x + padding, position.y + padding + 54);
}
