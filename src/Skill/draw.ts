/// Draws a Skill on the canvas.
///
/// # Input
///
/// * `ctx` - The canvas rendering context
/// * `skill` - The Skill to draw
///
/// # Output
///
/// This function doesn't return a value, but draws the skill on the canvas

import { Skill } from './_';
import { match } from './match';
import { V2 } from '../V2/_';
import { Shape } from '../Shape/_';
import { rectangle } from '../Shape/rectangle';
import { draw as shape_draw } from '../Shape/draw';

export function draw(ctx: CanvasRenderingContext2D, skill: Skill): void {
  match(skill, {
    Projectile: (damage, speed, range, target) => {
      const projectile_width = 2;
      const projectile_height = 3;
      const projectile_shape: Shape = rectangle(skill.pos, projectile_width, projectile_height);
      shape_draw(ctx, projectile_shape, 'black');
    }
  });
}
