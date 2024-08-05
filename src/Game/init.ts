/// Initializes the game state.
///
/// # Input
///
/// This function takes no parameters.
///
/// # Output
///
/// Returns an initial GameState with tick set to 0 and an empty players map.

import { GameState } from '../GameState/_';
import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';

export function init(): GameState {
  return {
    tick: 0,
    players: Map<UID, Player>()
  };
}
