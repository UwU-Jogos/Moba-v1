import { UwUChat2Client } from 'uwuchat2';
import { $main, $event, $event1, $event2, $event3, $event4, $KEYEVENT, $MOUSECLICK, $KEYMOUSE, $MOUSEMOVE, $SETNICK, $UG$SM$new_mach, $GameAction$eq, $UG$SM$TimedAction$time_action, $UG$SM$register_action, $simple_game, $UG$SM$compute } from './ex.js';
import { serialize } from './serialize.js';
import { deserialize } from './deserialize.js';
import { draw, draw_number } from './draw.js';
import { handle_key_mouse_event, handle_mouse_move, handle_mouse_click } from './input.js';

const client = new UwUChat2Client();
let canvas;
let ctx;
const room = 0;

window.addEventListener('load', () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (ctx) {
    //draw(ctx, $shape);
    //draw(ctx, $shape1, "red");
  } else {
    console.error("Canvas not found");
  }
});

const TPS = BigInt(30);
const PID = 1
const action_eq = {$: 'False'}
console.log(action_eq);
console.log($simple_game);

let mach = $UG$SM$new_mach(null)(null)(TPS)(action_eq)
//const mach = $UG$SM$new_mach(null, null, TPS, $GameAction$eq(null)(null));
console.log(mach);

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
    })
    window.addEventListener('keydown', (event) => handle_key_mouse_event(event, client, PID, room));
    window.addEventListener('keyup', (event) => handle_key_mouse_event(event, client, PID, room));
    window.addEventListener('mousemove', (event) => handle_mouse_move(event, client, PID, room));
    window.addEventListener('click', (event) => handle_mouse_click(event, client, PID, room));
  } catch (error) {
    console.error("Failed to initialize client:", error);
  }

  game_loop();
}

const compute = $UG$SM$compute(null)(null);
function game_loop() {
  const time = BigInt(client.time());
  const pair = compute(mach)($simple_game)(time);
  let state = pair.fst;
  mach = pair.snd;
  draw_number(ctx, Number(state.counter), 200, 200);
  requestAnimationFrame(game_loop);
}

initializeClient();
