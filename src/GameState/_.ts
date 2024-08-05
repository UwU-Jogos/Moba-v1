/// Represents the state of the game.
///
/// # Description
///
/// GameState contains the current tick of the game and a map of all players.
///
/// # Fields
///
/// * `tick` - The current tick (frame) of the game
/// * `players` - A map of player UIDs to Player objects

import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';

export type GameState = {
  tick: number;
  players: Map<UID, Player>;
};
