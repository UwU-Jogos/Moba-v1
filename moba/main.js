import { UwUChat2Client } from 'uwuchat2';
import { $main, $event, $event1, $event2, $event3, $event4, $KEYEVENT, $MOUSECLICK, $KEYMOUSE, $MOUSEMOVE, $SETNICK, $UG$SM$new_mach, $GameAction$eq, $UG$SM$TimedAction$time_action, $UG$SM$register_action,  $UG$SM$compute, $UG$SIPD$Event$eq } from './ex.js';
import { $export_game, $export_time_to_tick } from './ex.js';
import { deserialize } from './deserialize.js';
import { serialize } from './serialize.js';
import { draw, draw_number, draw_state } from './draw.js';
import { handle_key_mouse_event, handle_mouse_move, handle_mouse_click } from './input.js';

const client = new UwUChat2Client();
let canvas;
let ctx;
let room = 0;
let next_team = Math.random() < 0.5 ? "Red" : "Blue";
console.log(next_team);

const PLAYERS_LIMIT = 1;
const players_in_the_room = [];

const TPS = BigInt(50);

const PID = BigInt(Math.floor(Math.random() * (2 ** 4)));
console.log("PID is:", PID);

let state;
let mach = $UG$SM$new_mach(null)(null)(TPS)($UG$SIPD$Event$eq)

const register = $UG$SM$register_action(null)(null);
const compute = $UG$SM$compute(null)(null);

window.addEventListener('load', () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  setup_form_listener();
});

function setup_form_listener() {
  const login_form = document.getElementById('login-form');
  if (login_form) {
    login_form.addEventListener('submit', handle_form_submit);
  } else {
    console.error("Login form not found!");
  }
}

async function handle_form_submit(e) {
  e.preventDefault();

  const room_input = document.getElementById('room-number');
  const room_id = parseInt(room_input.value, 10);
  const name_input = document.getElementById('nickname');
  const name = name_input.value;
  let array_name = Array.from(name, char => char.charCodeAt(0));
  
  await start_game(room_id, array_name);
}

async function start_game(room_id, name) {
  room = room_id;

  //await client.init('ws://localhost:7171');
  await client.init('wss://server.uwu.games');
  console.log("CONNECTED");

  const leave = client.recv(room, msg => {
    const time_action = $UG$SM$TimedAction$time_action(null)
    let deserialized = deserialize(msg).value;
    const time = deserialized.$ == "ActionEvent" ? deserialized.action.time : deserialized.time;

    if (deserialized.$ == "ActionEvent" && deserialized.action.$ == "SetNick") {
      players_in_the_room.push(deserialized.action.pid);
      next_team = (next_team === "Red") ? "Blue" : "Red"
      update_lobby(players_in_the_room);
      if (players_in_the_room.length === PLAYERS_LIMIT) {
        show_game_container();
      }
    }
    const timed_ev = time_action(BigInt(time))(deserialized);

    mach = register(mach)(timed_ev);
  })

  // Create and send SetNick action
  const c_time = client.time();
  const set_nick_action = {
    $: "ActionEvent",
    action: {
      $: "SetNick",
      time: BigInt(c_time),
      pid: PID,
      side: next_team,
      nick: {
        $: "Cons",
        head: BigInt(69),
        tail: {$ : "Nil"}
      }
    }
  }

  const time_action = $UG$SM$TimedAction$time_action(null)
  const timed_action = $UG$SM$TimedAction$time_action(null)(BigInt(c_time))(set_nick_action);
  mach = register(mach)(timed_action);

  await client.send(room, serialize(set_nick_action));

  window.addEventListener('keydown', (event) => {
    mach = handle_key_mouse_event(event, client, PID, room, mach, register, time_action)
  })
  window.addEventListener('keyup', (event) => {
    mach = handle_key_mouse_event(event, client, PID, room, mach, register, time_action)
  });
  window.addEventListener('mousemove', (event) => handle_mouse_move(event, client, PID, room));
  window.addEventListener('click', (event) => {
    mach = handle_mouse_click(event, client, PID, room, mach, register, time_action)
  });
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevents the context menu from opening
    handle_mouse_click(event, client, PID, room);
  });

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

function update_lobby(players_in_the_room) {
  const lobby_players = document.getElementById('lobby-players');
  if (lobby_players) {
    lobby_players.innerHTML = `Players in lobby: ${players_in_the_room.length}/${PLAYERS_LIMIT}`;
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
  requestAnimationFrame(game_loop);
}

const targetFPS = 50;
const interval = 1000 / targetFPS;
let lastTime = performance.now();

function game_loop(currentTime) {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= interval) {
    lastTime = currentTime - (deltaTime % interval);

    const time = BigInt(client.time());

    //const tick = $export_time_to_tick(null)(null)(mach)(time);
    //console.log(tick);
    
    const pair = compute(mach)($export_game)(time);
    state = pair.fst;
    //console.log(state);
    mach = pair.snd;

    draw_state(state);
  }

  requestAnimationFrame(game_loop);
}

