// import UwUChat2Client from "./client";
// import lib from "./lib";
// import { List } from "immutable";

// const client = new UwUChat2Client.default();
// const output = document.getElementById('output');
// const serverTimeDisplay = document.getElementById('serverTime');
// const testRoom = 1; // Use room ID 1 for testing

// client.init('ws://localhost:8080').then(() => {
//     console.log('Connected to server');

//     // Listen for messages in the test room
//     client.recv(testRoom, (msg) => {
//         const text = new TextDecoder().decode(msg);
//         console.log(text);
//     });

//     // Handle keypress events
//     document.addEventListener('keypress', (event) => {
//         const key = event.key;
//         const keyBuffer = new TextEncoder().encode(key);
//         client.send(testRoom, keyBuffer);
//     });

//     // Update server time display
//     function updateServerTime() {
//         const serverTime = new Date(client.time());
//         console.log(`Server Time: ${serverTime.toISOString()}`);
//         requestAnimationFrame(updateServerTime);
//     }
//     updateServerTime();

// }).catch(console.error);



import UwUChat2Client from './client';
import lib from "./lib";

const COMMAND_MESSAGE = 0
const SET_NICK = 1

type GameMessage =
  | { tag: 0, user: number, time: number, key: Uint8Array }
  | { tag: 1, user: number, name: string }

const enum KeyEventType {
  PRESS = 1,
  RELEASE = 0
}

type KeyEvent = {
  key: number,
  event: KeyEventType
}

type Position = {
  x: number;
  y: number;
};

type Player = {
  id: number;
  name: string;
  position: Position;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

// type GameState = {
//   players: List<Player>;
// }

const client = new UwUChat2Client();
const loginScreen = document.getElementById('login-screen') as HTMLDivElement;
const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d')!;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const roomInput = document.getElementById('room') as HTMLInputElement;
const loginButton = document.getElementById('login-button') as HTMLButtonElement;

let username = '';
let room = 0;
let playerId = Math.floor(Math.random() * 1000000);
let pressedKeys = new Set<number>();
let players: { [key: number]: { name: string; keys: Set<number> } } = {};

loginButton.onclick = async () => {
  username = usernameInput.value;
  room = parseInt(roomInput.value);
  if (username && room) {
    await client.init('ws://server.uwu.games');
    client.recv(room, handleGameMessage);
    client.send(room, lib.encode({ tag: 1, user: playerId, name: username }));

    loginScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    draw();
  }
};

document.addEventListener('keydown', (event) => {
  if (!pressedKeys.has(event.keyCode)) {
    pressedKeys.add(event.keyCode);
    sendKeyEvent(event.keyCode, KeyEventType.PRESS);
  }
});

document.addEventListener('keyup', (event) => {
  if (pressedKeys.has(event.keyCode)) {
    pressedKeys.delete(event.keyCode);
    sendKeyEvent(event.keyCode, KeyEventType.RELEASE);
  }
});

function sendKeyEvent(key: number, event: KeyEventType) {
  const keyEvent = lib.encodeKey({ key, event });
  client.send(room, lib.encode({ tag: 0, user: playerId, time: client.time(), key: keyEvent }));
}
function handleGameMessage(msg: Uint8Array) {
  const decoded = lib.decode(msg);
  if (decoded.tag === 0) {
      if (!players[decoded.user]) {
          players[decoded.user] = { name: '', keys: new Set<number>() };
      }
      const keyEvent = lib.decodeKey(decoded.key);
      if (keyEvent.event === KeyEventType.PRESS) {
          players[decoded.user].keys.add(keyEvent.key);
      } else if (keyEvent.event === KeyEventType.RELEASE) {
          players[decoded.user].keys.delete(keyEvent.key);
      }
  } else if (decoded.tag === 1) {
      if (!players[decoded.user]) {
          players[decoded.user] = { name: decoded.name, keys: new Set<number>() };
      } else {
          players[decoded.user].name = decoded.name;
      }
  }
}

function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillText(`Ping: ${client.get_ping()} ms`, 10, 10);
  ctx.fillText(`Server Time: ${client.time()}`, 10, 30);
  ctx.fillText(`Your Pressed Keys: ${Array.from(pressedKeys).join(', ')}`, 10, 50);

  let yOffset = 70;
  for (const userId in players) {
      if (parseInt(userId) !== playerId) {
          ctx.fillText(`Player ${players[userId].name} Keys: ${Array.from(players[userId].keys).join(', ')}`, 10, yOffset);
          yOffset += 20;
      }
  }

  requestAnimationFrame(draw);
}
