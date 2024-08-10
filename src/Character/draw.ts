/// Draws a character on the canvas based on its type.
///
/// # Input
///
/// * `ctx` - The canvas rendering context
/// * `character` - The Character to draw
/// * `position` - The position to draw the character at
/// * `color` - The color to draw the character with
///
/// # Output
///
/// This function doesn't return a value, but draws the character on the canvas

import { Character } from './_';
import { V2 } from '../V2/_';
import { Shape } from '../Shape/_';
import { triangle } from '../Shape/triangle';
import { circle } from '../Shape/circle';
import { draw as shape_draw } from '../Shape/draw';
import { CharacterType } from './type';
import { PLAYER_RADIUS } from '../Helpers/consts';

export function draw(ctx: CanvasRenderingContext2D, character: CharacterType, position: V2, color: string): void {
  let shape: Shape;

  switch (character) {
    case CharacterType.TRIANGLE:
      const halfSide = PLAYER_RADIUS * Math.sqrt(3) / 2;
      const height = PLAYER_RADIUS * 1.5;
      shape = triangle(
        { x: position.x, y: position.y - height / 2 },
        { x: position.x - halfSide, y: position.y + height / 2 },
        { x: position.x + halfSide, y: position.y + height / 2 }
      );
      break;
    default:
      shape = circle(position, PLAYER_RADIUS / 2);
  }

  shape_draw(ctx, shape, color);
}
