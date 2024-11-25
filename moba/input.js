import { serialize } from './serialize.js';

const ARTIFICIAL_DELAY = 300;

function handle_mouse_click(ev, client, PID, room, mach, register, time_action) {
  if ((ev.button === 0 || ev.button === 2) && ev.target instanceof HTMLCanvasElement) {
    const time = client.time() + ARTIFICIAL_DELAY;
    const click = ev.button === 0 ? {$: "LeftButton"} : {$: "RightButton"}
    const x = Number((ev.clientX - ev.target.offsetLeft).toFixed(2));
    const y = Number((ev.clientY - ev.target.offsetTop).toFixed(2));
    const event = {
      $: "MouseClick",
      time: time,
      pid: PID,
      click: click,
      x: x,
      y: y
    }
    client.send(room, serialize(event));
    const timed_action = time_action(BigInt(time))(event);
    return register(mach)(timed_action);
  }
  return mach;
}

const key_state = {};
function handle_key_event(ev, client, PID, room, mach, register, time_action) {
  const time = client.time() + ARTIFICIAL_DELAY;
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
    const timed_action = time_action(BigInt(time))(event);
    return register(mach)(timed_action);
  }
  return mach;
}

let mouseX = 0;
let mouseY = 0;
function handle_mouse_move(event, client, PID, room) {
  if (event.target instanceof HTMLCanvasElement) {
    mouseX = event.clientX - event.target.offsetLeft;
    mouseY = event.clientY - event.target.offsetTop;
  }
}

function handle_key_mouse_event(ev, client, PID, room, mach, register, time_action) {
  const time = client.time() + ARTIFICIAL_DELAY;
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
      x: Number(mouseX.toFixed(2)),
      y: Number(mouseY.toFixed(2))
    }
    client.send(room, serialize(event));
    const timed_action = time_action(BigInt(time))(event);
    return register(mach)(timed_action);
  }
  return mach;
}

export { handle_mouse_click, handle_key_event, handle_mouse_move, handle_key_mouse_event };
