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
import { PLAYER_SQUARE_SIZE } from '../Helpers/consts';

export function draw(ctx: CanvasRenderingContext2D, character: CharacterType, position: V2, color: string): void {
  let shape: Shape;

  switch (character) {
    case CharacterType.TRIANGLE:
      const halfSize = PLAYER_SQUARE_SIZE / 2;
      shape = triangle(
        { x: position.x, y: position.y - halfSize },
        { x: position.x - halfSize, y: position.y + halfSize },
        { x: position.x + halfSize, y: position.y + halfSize }
      );
      break;
    default:
      // Default to a circle for any unhandled character types
      shape = circle(position, PLAYER_SQUARE_SIZE / 2);
  }

  shape_draw(ctx, shape, color);
}
