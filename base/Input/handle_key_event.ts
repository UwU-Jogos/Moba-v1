/// Handles keyboard events for movement and skills.
///
/// # Description
///
/// This function processes keyboard events, distinguishing between
/// movement keys (W, A, S, D) and skill keys (Q, W, E, R).
/// It then delegates to the appropriate handler function.
///
/// # Parameters
///
/// * `event` - The KeyboardEvent to be processed.
/// * `room` - The room number.
/// * `PID` - The player's unique identifier.
/// * `mach` - The state machine instance.
/// * `client` - The client instance.
///
/// # Side effects
///
/// * Updates the key state for movement keys.
/// * Triggers skill events for skill keys.

import { handle_movement_event } from "./handle_movement_event";
import { handle_skill_event } from "./handle_skill_event";
import { Action } from "../../moba/Action/_";
import { GameState } from "../../moba/GameState/_";
import * as sm from "@uwu-games/uwu-state-machine";

export function handle_key_event(
  event: KeyboardEvent,
  room: number,
  PID: number,
  mach: sm.Mach<GameState, Action>,
  client: any
): void {
  const key = event.key.toUpperCase() as string;
  const down = event.type === 'keydown';

  if (['W', 'A', 'S', 'D'].includes(key)) {
    handle_movement_event(key, down, room, PID, mach, client);
  } else if (['Q', 'W', 'E', 'R'].includes(key)) {
    handle_skill_event(key, down, room, PID, mach, client);
  }
}
