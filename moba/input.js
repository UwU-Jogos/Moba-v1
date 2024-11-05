import { serialize } from './serialize.js';

function handle_mouse_click(ev, client, PID, room) {
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
function handle_key_event(ev, client, PID, room) {
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
function handle_mouse_move(event, client, PID, room) {
  if (event.target instanceof HTMLCanvasElement) {
    mouseX = event.clientX - event.target.offsetLeft;
    mouseY = event.clientY - event.target.offsetTop;
  }
}

function handle_key_mouse_event(ev, client, PID, room) {
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

export { handle_mouse_click, handle_key_event, handle_mouse_move, handle_key_mouse_event };
