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
import { ARTIFICIAL_DELAY, PLAYERS_LIMIT, TIME_TO_START_GAME } from './Helpers/consts';
import { TimeDisplay } from './Helpers/time';
import { get_characters_list } from './Lobby/get_characters_list';
import { name_to_type } from './Character/name_to_type';
import { CharacterType } from './Character/type';
import { Finished, game_finished } from './GameState/finished';

// Types
// -----

const TPS = 32;
const PID = Math.floor(Math.random() * (2 ** 16));
const PRADIUS = 10;
console.log("PID is:", PID);

// Main App
// --------

let players_in_the_room: UID[] = [];
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
    populate_character_select();
  } else {
    console.error("Login form not found!");
  }
}

function populate_character_select() {
  const character_select = document.getElementById('character-select') as HTMLSelectElement;
  if (character_select) {
    character_select.innerHTML = ''; // Clear existing options
    const characters = get_characters_list();
    characters.forEach(character => {
      const option = document.createElement('option');
      option.value = character;
      option.textContent = character;
      character_select.appendChild(option);
    });
  } else {
    console.error("Character select not found!");
  }
}

async function handle_form_submit(e: Event) {
  e.preventDefault();
  
  const room_input = document.getElementById('room-number') as HTMLInputElement;
  const room_id = parseInt(room_input.value);
  const name_input = document.getElementById('nickname') as HTMLInputElement;
  const name = name_input.value;
  const character_select = document.getElementById('character-select') as HTMLSelectElement;
  const character = character_select.value;

  // Start the game with the provided room ID, name, and character
  await start_game(room_id, name, character);
}

// Function to start the game
async function start_game(room_id: UID, name: Name, character: string) {
  room = room_id;

  await client.init('ws://localhost:7171');
  //await client.init('ws://server.uwu.games');

  mach = sm.new_mach(TPS);

  // Join room and handle messages
  const leave = client.recv(room, msg => {
    try { 
      const deserialized_msg: Action = deserialize(msg);
      if (deserialized_msg.$ == 'SetNick') {
        players_in_the_room.push(deserialized_msg.pid);
        update_lobby();
        if (players_in_the_room.length === PLAYERS_LIMIT) {
          start_countdown();
        }
      }
      sm.register_action(mach, deserialized_msg); 
    }
    catch (e) { console.error("Error processing message:", e); }
  });

  // Create and send SetNick action
  const character_type : CharacterType = name_to_type(character);
  const set_nick_action: Action = {
    $: "SetNick",
    time: client.time(),
    pid: PID,
    name: name,
    character: character_type
  };
  sm.register_action(mach, set_nick_action);
  client.send(room, serialize(set_nick_action));

  // Set up key and mouse event listeners
  window.addEventListener('keydown', handle_key_event);
  window.addEventListener('keyup', handle_key_event);
  window.addEventListener('mousemove', handle_mouse_move);
  window.addEventListener('click', handle_mouse_click);

  // Show lobby
  show_lobby();
}

function show_lobby() {
  const login_container = document.getElementById('login-container');
  const lobby_container = document.getElementById('lobby-container');
  
  if (login_container && lobby_container) {
    login_container.style.display = 'none';
    lobby_container.style.display = 'block';
  } else {
    console.error("Could not find login or lobby container");
  }
}

function update_lobby() {
  const lobby_players = document.getElementById('lobby-players');
  if (lobby_players) {
    lobby_players.innerHTML = `Players in lobby: ${players_in_the_room.length}/${PLAYERS_LIMIT}`;
  }
}

function start_countdown() {
  let countdown = TIME_TO_START_GAME;
  const countdown_element = document.getElementById('countdown');
  if (countdown_element) {
    countdown_element.style.display = 'block';
    const timer = setInterval(() => {
      countdown_element.textContent = `Game starting in ${countdown} seconds`;
      countdown--;
      if (countdown < 0) {
        clearInterval(timer);
        show_game_container();
      }
    }, 1000);
  }
}

function show_game_container() {
  const lobby_container = document.getElementById('lobby-container');
  const game_container = document.getElementById('game-container');
  
  if (lobby_container && game_container) {
    lobby_container.style.display = 'none';
    game_container.style.display = 'block';
  } else {
    console.error("Could not find lobby or game container");
    return; 
  }

  // Start game loop
  game_loop();
}

// Input Handler
const key_state: { [key: string]: boolean } = {};
function handle_key_event(event: KeyboardEvent) {
  const key = event.key.toUpperCase();
  const down = event.type === 'keydown';
  if (['W', 'A', 'S', 'D'].includes(key)) {
    handle_movement_event(key, down);
  } else if (['Q', 'W', 'E', 'R'].includes(key)) {
    handle_skill_event(key, down);
  }
}

function handle_movement_event(key: string, down: boolean) {
  if (key_state[key] !== down) {
    key_state[key] = down;
    var time = client.time();
    var act = { $: "MovementEvent", time, pid: PID, key, down } as Action;
    sm.register_action(mach, act);
    client.send(room, serialize(act));
  }
}

function handle_skill_event(key: string, down: boolean) {
  if (key_state[key] !== down) {
    key_state[key] = down;
    var time = client.time();
    var act = { $: "SkillEvent", time, pid: PID, key, down, x: mouseX, y: mouseY } as Action;
    sm.register_action(mach, act);
    client.send(room, serialize(act));
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

// Add mouse position tracking
let mouseX = 0;
let mouseY = 0;
function handle_mouse_move(event: MouseEvent) {
  if (event.target instanceof HTMLCanvasElement) {
    mouseX = event.clientX - event.target.offsetLeft;
    mouseY = event.clientY - event.target.offsetTop;
  }
}

// Game Loop
function game_loop() {
  // Compute the current state
  const state = sm.compute(mach, { init, tick, when }, client.time());

  // Check if the game has finished
  let finished: Finished | null = game_finished(state);
  if (finished) {
    // Stop the game loop
    show_game_result(finished, state);
    return;
  }

  // Draw the current state
  draw(state);

  // Calcula o tempo decorrido em segundos
  const elapsedTime = state.tick / TPS;

  // Atualiza o tempo decorrido
  timeDisplay.update(elapsedTime);

  // Schedule the next frame
  requestAnimationFrame(game_loop);
}

function show_game_result(finished: Finished, state: GameState) {
  const game_container = document.getElementById('game-container');
  const result_container = document.getElementById('result-container');
  const result_message = document.getElementById('result-message');

  if (game_container && result_container && result_message) {
    game_container.style.display = 'none';
    result_container.style.display = 'block';
    
    const playerTeam = state.players.get(PID)?.team;
    if (playerTeam === finished.winner) {
      result_message.textContent = 'You Won!';
    } else if (playerTeam === finished.loser) {
      result_message.textContent = 'You Lost!';
    } else {
      result_message.textContent = 'Game Finished!';
    }
  } else {
    console.error("Could not find game or result container");
  }
}

// Initialize TimeDisplay
const timeDisplay = new TimeDisplay();
