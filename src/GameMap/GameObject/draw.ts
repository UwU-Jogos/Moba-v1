/// Draws a GameObject based on its type.
///
/// # Input
///
/// * `ctx` - The rendering context
/// * `gameObject` - The GameObject to be drawn
///
/// # Output
///
/// Renders the GameObject on the canvas

import { GameObject } from './_';
import { V2 } from '../../V2/_';
import { Shape } from '../../Shape/_';
import { match } from './match';
import { rectangle } from '../../Shape/rectangle';
import { line } from '../../Shape/line';
import { circle } from '../../Shape/circle';
import { Effect } from '../../Effect/_';
import { draw as shape_draw } from '../../Shape/draw';
import { WALL_COLOR, PLATFORM_COLOR, RESPAWN_AREA_COLOR } from '../../Helpers/consts';

export function draw(ctx: CanvasRenderingContext2D, gameObject: GameObject): void {
  match(gameObject, {
    Platform: (position: V2, width: number, height: number) => {
      const rectangle_shape : Shape = rectangle(position, width, height);
      shape_draw(ctx, rectangle_shape, PLATFORM_COLOR);
    },
    Wall: (position: V2, width: number, height: number) => {
      const line_shape : Shape = line(position, { x: position.x + width, y: position.y + height });
      shape_draw(ctx, line_shape, WALL_COLOR);
    },
    PushWall: (position: V2, width: number, height: number) => {
      const line_shape : Shape = line(position, { x: position.x + width, y: position.y + height });
      shape_draw(ctx, line_shape, WALL_COLOR);
    },
    LineWall: (ini: V2, end: V2) => {
      const line_shape : Shape = line(ini, end);
      shape_draw(ctx, line_shape, WALL_COLOR);
    },
    RespawnArea: (position: V2, width: number, height: number, active: number) => {
      if (active === 0) return;
      const top_line : Shape = line(position, { x: position.x + width, y: position.y });
      const right_line : Shape = line({ x: position.x + width, y: position.y }, { x: position.x + width, y: position.y + height });
      const bottom_line : Shape = line({ x: position.x, y: position.y + height }, { x: position.x + width, y: position.y + height });
      const left_line : Shape = line(position, { x: position.x, y: position.y + height });
      shape_draw(ctx, top_line, RESPAWN_AREA_COLOR);
      shape_draw(ctx, right_line, RESPAWN_AREA_COLOR);
      shape_draw(ctx, bottom_line, RESPAWN_AREA_COLOR);
      shape_draw(ctx, left_line, RESPAWN_AREA_COLOR);
    },
    Orb: (position: V2, radius: number, life: number, active: number, effects: Effect[], color: string) => {
      if (active === 0 || life <= 0) return;
      const circle_shape : Shape = circle(position, radius);
      shape_draw(ctx, circle_shape, color);

      // Draw life bar
      const lifeBarWidth = radius * 2;
      const lifeBarHeight = 5;
      const lifeBarY = position.y - radius - 10;
      const lifeBarX = position.x - radius;
      const currentLifeWidth = (life / 100) * lifeBarWidth;

      ctx.fillStyle = 'red';
      ctx.fillRect(lifeBarX, lifeBarY, lifeBarWidth, lifeBarHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(lifeBarX, lifeBarY, currentLifeWidth, lifeBarHeight);
    },
    TimedLineWall: (ini: V2, end: V2, active: number) => {
      if (active === 0) return;
      const line_shape : Shape = line(ini, end);
      shape_draw(ctx, line_shape, WALL_COLOR);
    },
  });
}
