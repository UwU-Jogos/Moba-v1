/// Handles a skill event triggered by a key press or release.
///
/// # Description
///
/// This function processes a skill event, updates the key state, creates an Action,
/// registers it with the state machine, and sends it to the server.
///
/// # Input
///
/// * `key` - The key associated with the skill event
/// * `down` - A boolean indicating whether the key is pressed (true) or released (false)
///
/// # Side Effects
///
/// * Updates the key_state
/// * Registers an action with the state machine
/// * Sends the serialized action to the server

import * as sm from '@uwu-games/uwu-state-machine';
import { Action } from '../Action/_';
import { GameState } from '../GameState/_';
import { serialize } from '../Action/serialize';
import { ARTIFICIAL_DELAY } from '../Helpers/consts';
import { mouseX, mouseY } from './handle_mouse_move';

const key_state: { [key: string]: boolean } = {};

export function handle_skill_event(key: string, down: boolean, room: number, PID: number, mach: sm.Mach<GameState, Action>, client: any): void {
  if (key_state[key] !== down) {
    key_state[key] = down;
    const time = client.time() + ARTIFICIAL_DELAY;
    const act: Action = { $: "SkillEvent", time, pid: PID, key, down, x: mouseX, y: mouseY };
    sm.register_action(mach, act);
    client.send(room, serialize(act));
  }
}
