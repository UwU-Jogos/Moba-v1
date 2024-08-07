/// Represents the state of the game.
///
/// # Description
///
/// GameState contains the current tick of the game, a map of all players, and the game map.
///
/// # Fields
///
/// * `tick` - The current tick (frame) of the game
/// * `players` - A map of player UIDs to Player objects
/// * `game_map` - The current game map

import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';
import { GameMap } from '../GameMap/_';

export type GameState = {
  tick: number;
  players: Map<UID, Player>;
  game_map: GameMap;
};
