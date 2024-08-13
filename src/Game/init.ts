/// Initializes the game state.
///
/// # Input
///
/// This function takes no parameters.
///
/// # Output
///
/// Returns an initial GameState with tick set to 0, an empty players map and the initial objects map

import { GameState } from '../GameState/_';
import { Map } from 'immutable';
import { UID } from '../UID/_';
import { Player } from '../Player/_';
import { init as init_map } from '../GameMap/init';
import { Projectile } from '../Projectile/_';

export function init(): GameState {
  return {
    tick: 0,
    players: Map<UID, Player>(),
    game_map: init_map(),
    projectile_system: Map<string, Projectile>()
  };
}
