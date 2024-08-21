/// Initializes a game map with simple GameObjects.
///
/// # Input
///
/// This function takes no parameters.
///
/// # Output
///
/// Returns a GameMap with predefined dimensions and a set of GameObjects.

import { GameMap } from './_';
import { Shape } from '../../base/Shape/_';
import { circle } from '../../base/Shape/circle';
import { draw as draw_shape } from '../../base/Shape/draw';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';
import { Body } from '../Body/_';
import { move } from '../Effect/move'

export function init(): GameMap {
  const { width, height } = get_canvas_dimensions();

  const bodies : Body[] = [];

  return {
    width, height, bodies
  };
}
