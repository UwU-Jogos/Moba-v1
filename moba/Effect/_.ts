/// Represents an effect that can be applied to the game state. It is something that happens and goes from a GameState to another.
///
/// # Type Parameters
///
/// * `R` - The return type of the effect function, in addition to the updated GameState.
///
/// # Description
///
/// An Effect is a function that takes the current GameState and returns a tuple containing:
/// 1. The updated GameState after applying the effect.
/// 2. An additional result of type R, which can be used to return extra information about the effect's application.
///

import { GameState } from '../GameState/_';

export type Effect<R> = (gs: GameState) => [GameState, R];
