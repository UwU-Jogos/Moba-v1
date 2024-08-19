/// Handles a mouse click event.
///
/// # Description
///
/// This function processes a mouse click event, creates an Action object,
/// registers it with the state machine, and sends it to the server.
///
/// # Input
///
/// * `event` - A MouseEvent object representing the click event
/// * `room` - The room identifier
/// * `PID` - The player's unique identifier
/// * `mach` - The machine state
/// * `client` - The client object
///
/// # Side Effects
///
/// * Registers the action with the state machine
/// * Sends the serialized action to the server

import * as sm from '@uwu-games/uwu-state-machine';
import { Action } from '../../moba/Action/_';
import { GameState } from '../../moba/GameState/_';
import { serialize } from '../../moba/Action/serialize';
import { ARTIFICIAL_DELAY } from '../../moba/Helpers/consts';

export function handle_mouse_click(
  event: MouseEvent,
  room: number,
  PID: number,
  mach: sm.Mach<GameState, Action>,
  client: any
): void {
  if (event.button === 0 && event.target instanceof HTMLCanvasElement) {
    const time = client.time() + ARTIFICIAL_DELAY;
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;
    const act: Action = { $: "MouseClick", time, pid: PID, x, y };

    // Add to own action log
    sm.register_action(mach, act);
    // Send to server
    client.send(room, serialize(act));
  }
}
