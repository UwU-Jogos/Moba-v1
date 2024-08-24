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
/// * `bodies` - Bodies in the map

import { Map } from 'immutable';
import { Body } from '../Body/_';

export type GameMap = {
  width: number;
  height: number;
  bodies: Map<string, Body>;
};

