import * as sm from '@uwu-games/uwu-state-machine';
import { UwUChat2Client } from 'uwuchat2';
import { Map } from 'immutable';
import { UID } from './UID/_'; // 48-bit
import { Key } from './Key/_'; // 8-bit
import { Name } from './Name/_'; // UTF-16
import { V2 } from './V2/_';
import { Player } from './Player/_';
import { GameState } from './GameState/_';
import { Action } from './Action/_';
import { init } from './Game/init';
import { when } from './Game/when';
import { tick } from './Game/tick';
import { draw } from './Game/draw';
import { deserialize } from './Action/deserialize';
import { serialize } from './Action/serialize';

// Types
// -----

const TPS = 32;
const PID = Math.floor(Math.random() * (2 ** 16));
const PRADIUS = 10;
console.log("PID is:", PID);

// Application
// -----------

// Initial State

// Computes an Action

// Computes a Tick

// Renders the GameState on the canvas
// Helpers
// ---------

function get_canvas_dimensions(): { width: number, height: number } {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  return { width: canvas.width, height: canvas.height };
}

// Serialization
// -------------
// (For the Action type only.)

// Main App
// --------

// Starts State Machine
var room : UID = 339;
var mach : sm.Mach<GameState, Action> = sm.new_mach(TPS);

// Connects to Server
const client = new UwUChat2Client();
//await client.init('ws://localhost:7171');
await client.init('ws://server.uwu.games');

// Joins Room & Handles Messages
const leave = client.recv(room, msg => {
  try { sm.register_action(mach, deserialize(msg)); }
  catch (e) {}
});

// Input Handler
const key_state: { [key: string]: boolean } = {};
function handle_key_event(event: KeyboardEvent) {
  const key = event.key.toUpperCase();
  if (['W', 'A', 'S', 'D'].includes(key)) {
    const down = event.type === 'keydown';
    if (key_state[key] !== down) {
      key_state[key] = down;
      var time = client.time();
      var act  = {$: "KeyEvent", time, pid: PID, key, down} as Action;
      // Add to own action log 
      sm.register_action(mach, act);
      // Send to server
      client.send(room, serialize(act));
    }
  }
}
window.addEventListener('keydown', handle_key_event);
window.addEventListener('keyup', handle_key_event);

// Game Loop
function game_loop() {
  // Compute the current state
  const state = sm.compute(mach, {init,tick,when}, client.time());

  // Draw the current state
  draw(state);

  // Schedule the next frame
  requestAnimationFrame(game_loop);
}
game_loop();
