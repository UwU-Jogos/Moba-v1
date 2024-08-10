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
import { draw as shape_draw } from '../../Shape/draw';
import { WALL_COLOR, PLATFORM_COLOR, RESPAWN_AREA_COLOR } from '../../Helpers/consts';

export function draw(ctx: CanvasRenderingContext2D, gameObject: GameObject): void {
  match(gameObject, {
    Platform: (position: V2, width: number, height: number) => {
      let rectangle_shape : Shape = rectangle(position, width, height);
      shape_draw(ctx, rectangle_shape, PLATFORM_COLOR);
    },
    Wall: (position: V2, width: number, height: number) => {
      let line_shape : Shape = line(position, { x: position.x + width, y: position.y + height });
      shape_draw(ctx, line_shape, WALL_COLOR);
    },
    PushWall: (position: V2, width: number, height: number) => {
      let line_shape : Shape = line(position, { x: position.x + width, y: position.y + height });
      shape_draw(ctx, line_shape, WALL_COLOR);
    },
    RespawnArea: (position: V2, width: number, height: number, active: number) => {
      if (active == 0) return;
      let rectangle_shape : Shape = rectangle(position, width, height);
      shape_draw(ctx, rectangle_shape, RESPAWN_AREA_COLOR);
    },
  });
}
