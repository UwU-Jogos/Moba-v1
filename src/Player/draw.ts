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
import { draw as draw_shape } from '../Shape/draw';
import { PLAYER_RADIUS, PLAYER_INITIAL_LIFE } from '../Helpers/consts';
import { TeamType } from '../Team/type';

export function draw(ctx: CanvasRenderingContext2D, player: Player): void {
  if (player.life <= 0) {
    return;
  }

  ctx.fillStyle = 'gray';
  ctx.fill(new Path2D());
  
  const teamColor = player.team === TeamType.TEAM_RED ? 'red' : 'blue';
  draw_shape(ctx, circle(player.pos, PLAYER_RADIUS), teamColor);
  
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
}
