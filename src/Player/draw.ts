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

import { Player } from './_';
import { circle } from '../Shape/circle';
import { PLAYER_RADIUS, PLAYER_INITIAL_LIFE } from '../Helpers/consts';
import { TeamType } from '../Team/type';
import { draw as draw_character } from '../Character/draw';
import { draw as draw_stats } from '../Stats/draw';

export function draw(ctx: CanvasRenderingContext2D, player: Player): void {
  if (player.life <= 0) {
    return;
  }

  ctx.fillStyle = 'gray';
  ctx.fill(new Path2D());
  
  const team_color = player.team === TeamType.TEAM_RED ? 'red' : 'blue';

  draw_character(ctx, player.character, player.pos, team_color);
  
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(player.name, player.pos.x, player.pos.y - 20);

  const life_bar_width = 40;
  const life_bar_height = 5; 
  const life_bar_x = player.pos.x - life_bar_width / 2;
  const life_bar_y = player.pos.y + 20; 
  const life_percentage = (player.life / PLAYER_INITIAL_LIFE);

  ctx.fillStyle = 'red';
  ctx.fillRect(life_bar_x, life_bar_y, life_bar_width, life_bar_height);

  ctx.fillStyle = 'green';
  ctx.fillRect(life_bar_x, life_bar_y, life_bar_width * life_percentage, life_bar_height);

  draw_stats(ctx, player.stats, player.pos);
}
