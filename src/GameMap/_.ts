/// Represents a game map.
///
/// # Description
///
/// A game map with size dimensions and an array of game objects.
///
/// # Fields
///
/// * `width` - The width of the map
/// * `height` - The height of the map
/// * `objects` - An array of GameObjects present in the map

import { GameObject } from './GameObject/_';

export type GameMap = {
  width: number;
  height: number;
  objects: GameObject[];
};
