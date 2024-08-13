/// Draws a Player on the canvas.
///
/// # Arguments
///
/// * `ctx: CanvasRenderingContext2D` - The rendering context
/// * `player: Player` - The Player to be drawn
///
/// # Returns
///
/// This function doesn't return a value. It renders the Player on the canvas.
///
/// # Description
///
/// Renders the Player on the canvas, including:
/// - The character sprite with team-specific coloring
/// - Player name
/// - Life bar
/// - Player stats
///
/// # Notes
///
/// - The player is not drawn if their life is 0 or less
/// - The team color darkens based on the number of destroyed orbs
/// - Players with 5 or more destroyed orbs are colored black
/// - The life bar is displayed below the player
/// - The player's name is displayed above the player

import { Player } from './_';
import { TeamType } from '../Team/type';
import { draw as draw_character } from '../Character/draw';
import { draw as draw_stats } from '../Stats/draw';

export function draw(ctx: CanvasRenderingContext2D, player: Player): void {
  if (player.life <= 0) {
    return;
  }

  ctx.fillStyle = 'gray';
  ctx.fill(new Path2D());

  let team_color: string;
  if (player.stats.destroyed_orbs >= 5) {
    team_color = 'rgb(0, 0, 0)'; // Black
  } else {
    const base_color = player.team === TeamType.TEAM_RED ? [255, 100, 100] : [150, 150, 255];
    const darkness = Math.min(player.stats.destroyed_orbs / 5, 1);
    const r = Math.floor(base_color[0] * (1 - darkness));
    const g = Math.floor(base_color[1] * (1 - darkness));
    const b = Math.floor(base_color[2] * (1 - darkness));
    team_color = `rgb(${r}, ${g}, ${b})`;
  }

  draw_character(ctx, player.character, player.pos, team_color);

  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(player.name, player.pos.x, player.pos.y - 20);

  const life_bar_width = 40;
  const life_bar_height = 5;
  const life_bar_x = player.pos.x - life_bar_width / 2;
  const life_bar_y = player.pos.y + 20;
  const life_percentage = (player.life / player.stats.max_life);

  ctx.fillStyle = 'red';
  ctx.fillRect(life_bar_x, life_bar_y, life_bar_width, life_bar_height);

  ctx.fillStyle = 'green';
  ctx.fillRect(life_bar_x, life_bar_y, life_bar_width * life_percentage, life_bar_height);

  draw_stats(ctx, player.stats, player.pos);
}