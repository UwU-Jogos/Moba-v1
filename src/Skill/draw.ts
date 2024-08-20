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
import { Effect } from '../Effect/_';
import { match } from './match';
import { V2 } from '../V2/_';
import { Shape } from '../Shape/_';
import { rectangle } from '../Shape/rectangle';
import { circle } from '../Shape/circle';
import { draw as shape_draw } from '../Shape/draw';

export function draw(ctx: CanvasRenderingContext2D, skill: Skill): void {
  match(skill, {
    Projectile: (damage, speed, range, target) => {
      const has_shot_through_wall = skill.effects.some((effect : Effect) => effect.$ === "ShotThroughWall");
      const projectile_width  = has_shot_through_wall ? 3 : 2;
      const projectile_height = has_shot_through_wall ? 4 : 3;
      const projectile_color  = has_shot_through_wall ? 'pink' : 'black';
      const projectile_shape: Shape = rectangle(skill.pos, projectile_width, projectile_height);
      shape_draw(ctx, projectile_shape, projectile_color);
    },
    HealArea: (amount, radius) => {
      if (radius == 0) { return; }
      const heal_area_shape: Shape = circle(skill.pos, radius);
      shape_draw(ctx, heal_area_shape, 'green');
    }
  });
}
