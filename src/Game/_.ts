/// Represents the main game module.
///
/// # Description
///
/// This module contains the core game logic and state management.
///
/// # Exports
///
/// * `GameState` - The type representing the current state of the game
/// * `Action` - The type representing possible actions in the game
/// * `init` - Function to initialize the game state
/// * `when` - Function to update the game state based on an action
/// * `draw` - Draws a state in the screen

import { GameState } from '../GameState/_';
import { Action } from '../Action/_';

export type Game = {
  init: () => GameState;
  when: (action: Action, state: GameState) => GameState;
  tick: (state: GameState) => GameState;
  draw: (state: GameState) => void;
};
