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
  setupFormListener();
});

// Also set up the listener immediately in case DOMContentLoaded has already fired
setupFormListener();

function setupFormListener() {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleFormSubmit);
  } else {
    console.error("Login form not found!");
  }
}

async function handleFormSubmit(e: Event) {
  e.preventDefault();
  
  const roomInput = document.getElementById('room-number') as HTMLInputElement;
  const roomId = parseInt(roomInput.value);
  const nameInput = document.getElementById('nickname') as HTMLInputElement;
  const name = nameInput.value;


  // Start the game with the provided room ID
  await startGame(roomId, name);
}

// Function to start the game
async function startGame(roomId: UID, name: Name) {
  room = roomId;

  await client.init('ws://localhost:7171');
  //await client.init('ws://server.uwu.games');

  mach = sm.new_mach(TPS);

  // Join room and handle messages
  const leave = client.recv(room, msg => {
    try { sm.register_action(mach, deserialize(msg)); }
    catch (e) { console.error("Error processing message:", e); }
  });

  // Create and send SetNick action
  const setNickAction: Action = {
    $: "SetNick",
    time: client.time(),
    pid: PID,
    name: name
  };
  sm.register_action(mach, setNickAction);
  client.send(room, serialize(setNickAction));

  // Hide login form and show game container
  const loginContainer = document.getElementById('login-container');
  const gameContainer = document.getElementById('game-container');
  
  if (loginContainer && gameContainer) {
    loginContainer.style.display = 'none';
    gameContainer.style.display = 'block';
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

