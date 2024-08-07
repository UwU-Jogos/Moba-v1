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
    { kind: 'Wall', position: { x: 100, y: 200 }, width: width - 400, height: 10 },
    { kind: 'Platform', position: { x: 100, y: height - 100 }, width: 100, height: 20 },
  ];
    { kind: 'Wall', position: { x: 100, y: 200 }, width: width - 400, height: 10 },
    //{ kind: 'Wall', position: { x: 0, y: height - 10 }, width: width, height: 10 },
    //{ kind: 'Wall', position: { x: 0, y: 0 }, width: 10, height: height },
    //{ kind: 'Wall', position: { x: width - 10, y: 0 }, width: 10, height: height },
    { kind: 'Platform', position: { x: 100, y: height - 100 }, width: 100, height: 20 },
    //{ kind: 'Platform', position: { x: width - 300, y: height - 200 }, width: 200, height: 20 },
  ];

  return {
    width: width,
    height: height,
    objects: objects
  };
}
