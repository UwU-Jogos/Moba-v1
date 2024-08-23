/// Handles a movement event by updating the key state and registering the action.
///
/// # Description
///
/// This function is called when a movement key is pressed or released. It updates the key state,
/// creates a MovementEvent action, registers it with the state machine, and sends it to the server.
///
/// # Parameters
///
/// * `key` - The key involved in the movement event (type: string)
/// * `down` - Whether the key is pressed down (true) or released (false)
/// * `room` - The room identifier (type: number)
/// * `PID` - The player's unique identifier (type: number)
/// * `mach` - The machine object (type: sm.Mach<GameState, Action>)
/// * `client` - The client object (type: any)
///
/// # Side Effects
///
/// * Updates the key_state
/// * Registers an action with the state machine
/// * Sends the action to the server

import * as sm from '@uwu-games/uwu-state-machine';
import { Action } from '../../moba/Action/_';
import { GameState } from '../../moba/GameState/_';
import { ARTIFICIAL_DELAY } from '../../moba/Helpers/consts';
import { serialize } from '../../moba/Action/serialize';

const key_state: { [key: string]: boolean } = {};

export function handle_movement_event(
  key: string,
  down: boolean,
  room: number,
  PID: number,
  mach: sm.Mach<GameState, Action>,
  client: any
): void {
  if (key_state[key] !== down) {
    key_state[key] = down;
    const time = client.time() + ARTIFICIAL_DELAY;
    const act: Action = { $: "MovementEvent", time, pid: PID, key, down };
    sm.register_action(mach, act);
    client.send(room, serialize(act));
  }
}
