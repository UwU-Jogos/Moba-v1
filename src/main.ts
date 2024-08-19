import * as sm from '@uwu-games/uwu-state-machine';
import { UwUChat2Client } from 'uwuchat2';
import { UID } from './UID/_'; // 48-bit
import { Name } from './Name/_'; // UTF-16
import { GameState } from './GameState/_';
import { Finished, game_finished } from './GameState/finished';
import { Action } from './Action/_';
import { init } from './Game/init';
import { when } from './Game/when';
import { tick } from './Game/tick';
import { draw } from './Game/draw';
import { deserialize } from './Action/deserialize';
import { serialize } from './Action/serialize';
import { ARTIFICIAL_DELAY, PLAYERS_LIMIT, TIME_TO_START_GAME } from './Helpers/consts';
import { get_characters_list } from './Lobby/get_characters_list';
import { name_to_type } from './Character/name_to_type';
import { CharacterType } from './Character/type';
import { Timer } from './Timer/_';
import { init as init_timer } from './Timer/init';
import { is_time_up } from './Timer/is_time_up';
import { reset as reset_timer } from './Timer/reset';
import { update as update_timer } from './Timer/update';
import { populate_character_select } from './Lobby/populate_character_select';
import { show_lobby } from './Lobby/show_lobby';
import { update_lobby } from './Lobby/update_lobby';
import { handle_key_event } from './Input/handle_key_event';
import { handle_mouse_move } from './Input/handle_mouse_move';
import { handle_mouse_click } from './Input/handle_mouse_click';

// Types
// -----

const TPS = 32;
const PID = Math.floor(Math.random() * (2 ** 16));
console.log("PID is:", PID);

// Main App
// --------

const players_in_the_room: UID[] = [];
let room: UID;
let mach: sm.Mach<GameState, Action>;
const client = new UwUChat2Client();

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  setup_form_listener();
});

// Also set up the listener immediately in case DOMContentLoaded has already fired
setup_form_listener();

// Extract to: /src/UI/setup_form_listener.ts
function setup_form_listener(): void {
  const login_form = document.getElementById('login-form');

  if (login_form) {
    login_form.addEventListener('submit', handle_form_submit);
    populate_character_select();
  } else {
    console.error("Login form not found!");
  }
}

// Extract to: /src/UI/handle_form_submit.ts
async function handle_form_submit(e: Event): Promise<void> {
  e.preventDefault();

  const room_input = document.getElementById('room-number') as HTMLInputElement;
  const room_id = parseInt(room_input.value, 10);
  const name_input = document.getElementById('nickname') as HTMLInputElement;
  const name = name_input.value;
  const character_select = document.getElementById('character-select') as HTMLSelectElement;
  const character = character_select.value;

  // Start the game with the provided room ID, name, and character
  await start_game(room_id, name, character);
}

// Extract to: /src/Game/start_game.ts
async function start_game(room_id: UID, name: Name, character: string): Promise<void> {
  room = room_id;

   await client.init('ws://localhost:7171');
  //await client.init('ws://server.uwu.games');

  mach = sm.new_mach(TPS);

  // Join room and handle messages
  // tslint:disable-next-line:no-unused-variable
  const leave = client.recv(room, msg => {
    try {
      const deserialized_msg: Action = deserialize(msg);
      if (deserialized_msg.$ === 'SetNick') {
        players_in_the_room.push(deserialized_msg.pid);
        update_lobby(players_in_the_room);
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
    name,
    character: character_type
  };
  sm.register_action(mach, set_nick_action);
  client.send(room, serialize(set_nick_action));

  // Set up key and mouse event listeners
  window.addEventListener('keydown', (event) => handle_key_event(event, room,  PID, mach, client));
  window.addEventListener('keyup', (event) => handle_key_event(event, room, PID, mach, client));
  window.addEventListener('mousemove', handle_mouse_move);
  window.addEventListener('click', (event) => handle_mouse_click(event, room, PID, mach, client));

  // Show lobby
  show_lobby();
}

// Extract to: /src/UI/start_countdown.ts
function start_countdown(): void {
  let countdown = TIME_TO_START_GAME;
  const countdown_element = document.getElementById('countdown');
  if (countdown_element) {
    countdown_element.style.display = 'block';
    const countdown_timer = setInterval(() => {
      countdown_element.textContent = `Game starting in ${countdown} seconds`;
      countdown--;
      if (countdown < 0) {
        clearInterval(countdown_timer);
        show_game_container();
      }
    }, 1000);
  }
}

// Extract to: /src/UI/show_game_container.ts
function show_game_container(): void {
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
  timer = init_timer();
  game_loop();
}

// Game Loop
let timer : Timer; 

// Extract to: /src/Game/game_loop.ts
function game_loop(): void {
  // Compute the current state
  const state = sm.compute(mach, { init, tick, when }, client.time());

  timer = update_timer(timer, state.tick / TPS);

  // Check if the game has finished
  const finished: Finished | null = game_finished(state, is_time_up(timer));
  if (finished) {
    show_game_result(finished, state);
    return;
  }

  // Draw the current state
  draw(state);

  // Schedule the next frame
  requestAnimationFrame(game_loop);
}

function show_game_result(finished: Finished, state: GameState): void {
  const game_container = document.getElementById('game-container');
  const result_container = document.getElementById('result-container');
  const result_message = document.getElementById('result-message');
  const stats_container = document.getElementById('result-stats');

  if (game_container && result_container && result_message && stats_container) {
    game_container.style.display = 'none';
    result_container.style.display = 'block';

    if (finished.draw) {
      result_message.textContent = 'That was a Draw!';
    } else {
      const player_team = state.players.get(PID)?.team;
      if (player_team === finished.winner) {
        result_message.textContent = 'You Won!';
      } else if (player_team === finished.loser) {
        result_message.textContent = 'You Lost!';
      } else {
        result_message.textContent = 'Game Finished!';
      }
    }

    stats_container.innerHTML = '<h3>Player Stats:</h3>';
    show_player_stats(state, stats_container);
  } else {
    console.error("Could not find game, result, or stats container");
  }
}

function show_player_stats(state: GameState, container: HTMLElement): void {
  state.players.forEach((player, pid) => {
    const player_stats = document.createElement('div');
    player_stats.className = 'player-stats';
    player_stats.innerHTML = `
      <h4>${player.name} (${pid === PID ? 'You' : 'Opponent'})</h4>
      <p>Kills: ${player.stats.kills}</p>
      <p>Lifes: ${player.stats.lifes}</p>
      <p>Destroyed Orbs: ${player.stats.destroyed_orbs}</p>
      <p>Total life healed: ${player.stats.total_life_healed}</p>
      <p>Total damage received: ${player.stats.total_damage_received}</p>
      <p>Total damage caused: ${player.stats.total_damage_caused}</p>
    `;
    container.appendChild(player_stats);
  });
}

