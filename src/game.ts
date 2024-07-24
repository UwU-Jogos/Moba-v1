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
let playerId = 0 // Math.floor(Math.random() * 1000000);
let pressedKeys = new Set<number>();
let players: { [key: number]: { name: string; keys: Set<number>; x: number; y: number} } = {};

const PLAYER_RADIUS = 10;
const MOVE_SPEED = 2;

// Function to encode a username as a number
function encodeUsername(name: string): number {
  const buffer = new TextEncoder().encode(name);
  let num = 0;
  for (let i = 0; i < buffer.length; i++) {
    num += buffer[i] * (256 ** i);
  }
  return num;
}

// Function to decode a number back to a username
function decodeUsername(num: number): string {
  const buffer = [];
  while (num > 0) {
    buffer.push(num % 256);
    num = Math.floor(num / 256);
  }
  return new TextDecoder().decode(new Uint8Array(buffer));
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Function to generate a unique color based on the player's ID
function generateColor(playerId: number): string {
  const hash = (playerId * 0xdeadbeef) % 0xffffff;
  const color = '#' + ('000000' + hash.toString(16)).slice(-6);
  return color;
}
loginButton.onclick = async () => {
  username = usernameInput.value;
  playerId = encodeUsername(username);
  room = parseInt(roomInput.value);
  if (username && room) {
    await client.init('ws://server.uwu.games');
    client.recv(room, handleGameMessage);
    client.send(room, lib.encode({ tag: 1, user: playerId, name: username }));

    loginScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    // Initialize the player's position and color
    players[playerId] = {
      name: username,
      keys: new Set<number>(),
      x: gameCanvas.width / 2,
      y: gameCanvas.height / 2,
    };

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
  computeState(decoded);
}

function computeState(event: { tag: 0; user: number; time: number; key: Uint8Array; } | { tag: 1; user: number; name: string; }) {
  if (event.tag === 0) {
    if (!players[event.user]) {
      players[event.user] = { name: '', keys: new Set<number>(), x: gameCanvas.width / 2, y: gameCanvas.height / 2 };
    }
    const keyEvent = lib.decodeKey(event.key);
    if (keyEvent.event === KeyEventType.PRESS) {
      players[event.user].keys.add(keyEvent.key);
    } else if (keyEvent.event === KeyEventType.RELEASE) {
      players[event.user].keys.delete(keyEvent.key);
    }
  } else if (event.tag === 1) {
    if (!players[event.user]) {
      players[event.user] = { name: event.name, keys: new Set<number>(), x: gameCanvas.width / 2, y: gameCanvas.height / 2 };
    } else {
      players[event.user].name = event.name;
    }
  }
}

function updatePlayerPositions() {
  for (const userId in players) {
    const player = players[userId];

    if (player.keys.has(87) || player.keys.has(38)) { // 'w' or 'ArrowUp'
      player.y -= MOVE_SPEED;
    }
    if (player.keys.has(83) || player.keys.has(40)) { // 's' or 'ArrowDown'
      player.y += MOVE_SPEED;
    }
    if (player.keys.has(65) || player.keys.has(37)) { // 'a' or 'ArrowLeft'
      player.x -= MOVE_SPEED;
    }
    if (player.keys.has(68) || player.keys.has(39)) { // 'd' or 'ArrowRight'
      player.x += MOVE_SPEED;
    }

    // Ensure players stay within bounds
    player.x = Math.max(PLAYER_RADIUS, Math.min(gameCanvas.width - PLAYER_RADIUS, player.x));
    player.y = Math.max(PLAYER_RADIUS, Math.min(gameCanvas.height - PLAYER_RADIUS, player.y));
  }
}

function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillText(`Ping: ${client.get_ping()} ms`, 10, 10);
  ctx.fillText(`Server Time: ${client.time()}`, 10, 30);
  ctx.fillText(`Your Pressed Keys: ${Array.from(pressedKeys).join(', ')}`, 10, 50);

  // Update player positions based on keys pressed
  updatePlayerPositions();

  let yOffset = 70;
  for (const userId in players) {
    const player = players[userId];
    if (parseInt(userId) !== playerId) {
      ctx.fillText(`Player ${players[userId].name} Keys: ${Array.from(players[userId].keys).join(', ')}`, 10, yOffset);
      yOffset += 20;
    }
    ctx.fillStyle = generateColor(parseInt(userId));
    ctx.beginPath();
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(player.name, player.x - PLAYER_RADIUS, player.y - PLAYER_RADIUS - 5);
  }

  requestAnimationFrame(draw);

}