import { UwUChat2Client } from 'uwuchat2';
import { $main, $event, $event1, $event2, $event3, $event4, $KEYEVENT, $MOUSECLICK, $KEYMOUSE, $MOUSEMOVE, $SETNICK, $UG$SM$new_mach, $GameAction$eq, $UG$SM$TimedAction$time_action, $UG$SM$register_action,  $UG$SM$compute } from './ex.js';
import { $export_game } from './ex.js';
import { deserialize } from './deserialize.js';
import { draw, draw_number, draw_state } from './draw.js';
import { handle_key_mouse_event, handle_mouse_move, handle_mouse_click } from './input.js';

console.log($export_game);

const client = new UwUChat2Client();
let canvas;
let ctx;
const room = 0;

window.addEventListener('load', () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
});

const TPS = BigInt(30);
const PID = BigInt(0);
const action_eq = {$: 'False'}

let state;

let mach = $UG$SM$new_mach(null)(null)(TPS)(action_eq)
const register = $UG$SM$register_action(null)(null);

async function initializeClient() {
  try {
    await client.init('ws://localhost:7171');

    const leave = client.recv(room, msg => {
      const time_action = $UG$SM$TimedAction$time_action(null)
      let deserialized = deserialize(msg).value;
      const time = deserialized.$ == "ActionEvent" ? deserialized.action.time : deserialized.time;
      const timed_ev = time_action(BigInt(time))(deserialized);
      console.log("Registering timed event: ", timed_ev);
      mach = register(mach)(timed_ev);
      console.log(state);
      console.log(mach);
    })

    window.addEventListener('keydown', (event) => handle_key_mouse_event(event, client, PID, room));
    window.addEventListener('keyup', (event) => handle_key_mouse_event(event, client, PID, room));
    window.addEventListener('mousemove', (event) => handle_mouse_move(event, client, PID, room));
    window.addEventListener('click', (event) => handle_mouse_click(event, client, PID, room));
    window.addEventListener('contextmenu', (event) => {
      event.preventDefault(); // Prevents the context menu from opening
      handle_mouse_click(event, client, PID, room);
    });
  } catch (error) {
    console.error("Failed to initialize client:", error);
  }

  game_loop();
}

const compute = $UG$SM$compute(null)(null);
function game_loop() {
  const time = BigInt(client.time());
  const pair = compute(mach)($export_game)(time);
  state = pair.fst;
  mach = pair.snd;
  //console.log(state);
  draw_state(state);
  requestAnimationFrame(game_loop);
}

initializeClient();
