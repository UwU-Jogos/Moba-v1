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
import { GameObject } from './GameObject/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';

export function init(): GameMap {
  const { width, height } = get_canvas_dimensions();

  const objects: GameObject[] = [
  ]
   return {
    width: width,
    height: height,
    objects: objects
  };
}
