import { UwUChat2Client } from 'uwuchat2';
import { $main, $event, $event1, $event2, $event3, $event4, $KEYEVENT, $MOUSECLICK, $KEYMOUSE, $MOUSEMOVE, $SETNICK, $UG$SM$new_mach, $GameAction$eq } from './ex.js';
import { $shape, $shape1 } from './ex.js';
import { serialize } from './serialize.js';
import { deserialize } from './deserialize.js';
import { draw } from './draw.js';

const client = new UwUChat2Client();
let canvas;
const room = 0;
console.log(JSON.stringify($shape));
console.log(JSON.stringify($shape1));

window.addEventListener('load', () => {
  canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (ctx) {
    draw(ctx, $shape);
    draw(ctx, $shape1, "red");
  } else {
    console.error("Canvas not found");
  }
});

const TPS = BigInt(30);
const PID = 1
const action_eq = $GameAction$eq(null)(null);
console.log(action_eq);
const mach = $UG$SM$new_mach(null)(null)(TPS)(action_eq)
//const mach = $UG$SM$new_mach(null, null, TPS, $GameAction$eq(null)(null));
console.log(mach);


function handle_mouse_click(ev) {
  if ((ev.button === 0 || ev.button === 1) && ev.target instanceof HTMLCanvasElement) {
    const time = client.time();
    const click = ev.button === 0 ? {$: "LeftButton"} : {$: "RightButton"}
    const x = ev.clientX - ev.target.offsetLeft;
    const y = ev.clientY - ev.target.offsetTop;
    const event = {
      $: "MouseClick",
      time: time,
      pid: PID,
      click: click,
      x: x,
      y: y
    }
    client.send(room, serialize(event));
  }
}

const key_state = {};
function handle_key_event(ev) {
  const time = client.time();
  const down = ev.type === 'keydown'
  const key_char = ev.key.charCodeAt(0).toUpperCase()
  if (key_state[key_char] !== down) {
    key_state[key_char] = down;
    let event = {
      $: "KeyEvent",
      time: time,
      pid: PID,
      key: { $: "Cons", head: keyChar, tail: {$: "Nil"}},
      pressed: down == true ? {$: "True"} : {$: "False"}
    }
    client.send(room, serialize(event));
  }
}

let mouseX = 0;
let mouseY = 0;
function handle_mouse_move(event) {
  if (event.target instanceof HTMLCanvasElement) {
    mouseX = event.clientX - event.target.offsetLeft;
    mouseY = event.clientY - event.target.offsetTop;
  }
}

function handle_key_mouse_event(ev) {
  const time = client.time();
  const down = ev.type === 'keydown'

  const key_char = ev.key.toUpperCase().charCodeAt(0)
    if (key_state[key_char] !== down) {
    key_state[key_char] = down;
    let event = {
      $: "KeyMouse",
      time: time,
      pid: PID,
      key: { $: "Cons", head: key_char, tail: {$: "Nil"}},
      pressed: down == true ? {$: "True"} : {$: "False"},
      x: mouseX,
      y: mouseY
    }
    client.send(room, serialize(event));
  }
}

async function initializeClient() {
  try {
    await client.init('ws://localhost:7171');

    const leave = client.recv(room, msg => {
      // deserialize here
      let deserialized = deserialize(msg);
      console.log(deserialized);
    })

    window.addEventListener('keydown', (event) => handle_key_mouse_event(event));
    window.addEventListener('keyup', (event) => handle_key_mouse_event(event));
    window.addEventListener('mousemove', (event) => handle_mouse_move(event));
    window.addEventListener('click', (event) => handle_mouse_click(event));
  } catch (error) {
    console.error("Failed to initialize client:", error);
  }
}

initializeClient();
