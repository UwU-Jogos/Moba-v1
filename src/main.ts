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
import { ARTIFICIAL_DELAY } from './Helpers/consts';
import { TimeDisplay } from './Helpers/time';

// Types
// -----

const TPS = 32;
const PID = Math.floor(Math.random() * (2 ** 16));
const PRADIUS = 10;
console.log("PID is:", PID);

// Main App
// --------

let room: UID;
let mach: sm.Mach<GameState, Action>;
const client = new UwUChat2Client();

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  setup_form_listener();
});

// Also set up the listener immediately in case DOMContentLoaded has already fired
setup_form_listener();

function setup_form_listener() {
  const login_form = document.getElementById('login-form');
  
  if (login_form) {
    login_form.addEventListener('submit', handle_form_submit);
  } else {
    console.error("Login form not found!");
  }
}

async function handle_form_submit(e: Event) {
  e.preventDefault();
  
  const room_input = document.getElementById('room-number') as HTMLInputElement;
  const room_id = parseInt(room_input.value);
  const name_input = document.getElementById('nickname') as HTMLInputElement;
  const name = name_input.value;


  // Start the game with the provided room ID
  await start_game(room_id, name);
}

// Function to start the game
async function start_game(room_id: UID, name: Name) {
  room = room_id;

  await client.init('ws://localhost:7171');
  //await client.init('ws://server.uwu.games');

  mach = sm.new_mach(TPS);

  // Join room and handle messages
  const leave = client.recv(room, msg => {
    try { sm.register_action(mach, deserialize(msg)); }
    catch (e) { console.error("Error processing message:", e); }
  });

  // Create and send SetNick action
  const set_nick_action: Action = {
    $: "SetNick",
    time: client.time(),
    pid: PID,
    name: name
  };
  sm.register_action(mach, set_nick_action);
  client.send(room, serialize(set_nick_action));

  // Hide login form and show game container
  const login_container = document.getElementById('login-container');
  const game_container = document.getElementById('game-container');
  
  if (login_container && game_container) {
    login_container.style.display = 'none';
    game_container.style.display = 'block';
  } else {
    console.error("Could not find login or game container");
    return; 
  }

  // Set up key and mouse event listeners
  window.addEventListener('keydown', handle_key_event);
  window.addEventListener('keyup', handle_key_event);
  window.addEventListener('click', handle_mouse_click);

  // Start game loop
  game_loop();
}

// Input Handler
const key_state: { [key: string]: boolean } = {};
function handle_key_event(event: KeyboardEvent) {
  const key = event.key.toUpperCase();
  if (['W', 'A', 'S', 'D'].includes(key)) {
    const down = event.type === 'keydown';
    if (key_state[key] !== down) {
      key_state[key] = down;
      var time = client.time();
      var act = { $: "KeyEvent", time, pid: PID, key, down } as Action;
      // Add to own action log
      sm.register_action(mach, act);
      // Send to server
      client.send(room, serialize(act));
    }
  }
}

// Mouse Click Handler
function handle_mouse_click(event: MouseEvent) {
  if (event.button === 0 && event.target instanceof HTMLCanvasElement) {
    const time = client.time() + ARTIFICIAL_DELAY;
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;
    const act = { $: "MouseClick", time, pid: PID, x, y } as Action;

    // Add to own action log
    sm.register_action(mach, act);
    // Send to server
    client.send(room, serialize(act));
  }
}

window.addEventListener('keydown', handle_key_event);
window.addEventListener('keyup', handle_key_event);
window.addEventListener('click', handle_mouse_click);

// Game Loop
function game_loop() {
  // Compute the current state
  const state = sm.compute(mach, { init, tick, when }, client.time());

  // Draw the current state
  draw(state);

  // Calcula o tempo decorrido em segundos
  const elapsedTime = state.tick / TPS;

  // Atualiza o tempo decorrido
  timeDisplay.update(elapsedTime);

  // Schedule the next frame
  requestAnimationFrame(game_loop);
}

// Initialize TimeDisplay
const timeDisplay = new TimeDisplay();

