import UwUChat2Client from './client.js';
import lib from "./lib.js";

const COMMAND_MESSAGE = 0;
const SET_NICK = 1;

type GameMessage =
  | { tag: 0, user: number, time: number, key: Uint8Array }
  | { tag: 1, user: number, name: string };

const enum KeyEventType {
  PRESS = 1,
  RELEASE = 0
}

type KeyEvent = {
  key: number;
  event: KeyEventType;
};

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
};

type GameState = {
  players: { [key: number]: Player };
};

const client = new UwUChat2Client();
const loginScreen = document.getElementById('login-screen') as HTMLDivElement;
const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d')!;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const roomInput = document.getElementById('room') as HTMLInputElement;
const loginButton = document.getElementById('login-button') as HTMLButtonElement;

let username = '';
let room = 0;
let playerId = 0;
let pressedKeys = new Set<number>();
let gameState: GameState = { players: {} };

const PLAYER_RADIUS = 8;
const MOVE_SPEED = 2;
let tick = 1;
const tickRate = 240;
const tickInterval = 1000 / tickRate;

// Função para codificar um nome de usuário como um número
function encodeUsername(name: string): number {
  const buffer = new TextEncoder().encode(name);
  let num = 0;
  for (let i = 0; i < buffer.length; i++) {
    num += buffer[i] * (256 ** i);
  }
  return num;
}

// Função para decodificar um número de volta para um nome de usuário
function decodeUsername(num: number): string {
  const buffer = [];
  while (num > 0) {
    buffer.push(num % 256);
    num = Math.floor(num / 256);
  }
  return new TextDecoder().decode(new Uint8Array(buffer));
}

// Função para gerar uma cor única com base no ID do jogador
function generateColor(playerId: number): string {
  const hash = (playerId * 0xdeadbeef) % 0xffffff;
  const color = '#' + ('000000' + hash.toString(16)).slice(-6);
  return color;
}

// Função para lidar com o login
async function handleLogin() {
  username = usernameInput.value;
  playerId = encodeUsername(username);
  room = parseInt(roomInput.value);
  if (username && room) {
    await client.init('ws://server.uwu.games');
    client.recv(room, handleGameMessage);
    client.send(room, lib.encode({ tag: SET_NICK, user: playerId, name: username }));

    loginScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    // Inicializar a posição e a cor do jogador
    gameState.players[playerId] = {
      id: playerId,
      name: username,
      position: { x: gameCanvas.width / 2, y: gameCanvas.height / 2 },
      w: false,
      a: false,
      s: false,
      d: false,
    };

    addKeyboardListeners();
    setInterval(() => {
      // updatePlayerPositions();
      draw();
    }, tickInterval);
  }
}

loginButton.onclick = handleLogin;

function addKeyboardListeners(): void {
  document.addEventListener('keydown', (event) => {
    // if (!pressedKeys.has(event.keyCode)) {
      pressedKeys.add(event.keyCode);
      sendKeyEvent(event.keyCode, KeyEventType.PRESS);
      console.log(tick);
      tick += 1
    // }
    
  });

  document.addEventListener('keyup', (event) => {
    if (pressedKeys.has(event.keyCode)) {
      pressedKeys.delete(event.keyCode);
      sendKeyEvent(event.keyCode, KeyEventType.RELEASE);
    }
  });
}

function sendKeyEvent(key: number, event: KeyEventType) {
  const keyEvent = lib.encodeKey({ key, event });
  client.send(room, lib.encode({ tag: COMMAND_MESSAGE, user: playerId, time: client.time(), key: keyEvent }));
}

function handleGameMessage(msg: Uint8Array) {
  const decoded = lib.decode(msg);
  computeState(decoded);
}

function computeState(event: GameMessage) {
  if (event.tag === COMMAND_MESSAGE) {
    if (!gameState.players[event.user]) {
      gameState.players[event.user] = {
        id: event.user,
        name: '',
        position: { x: gameCanvas.width / 2, y: gameCanvas.height / 2 },
        w: false,
        a: false,
        s: false,
        d: false,
      };
    }
    const keyEvent = lib.decodeKey(event.key);
    const player = gameState.players[event.user];
    if (keyEvent.event === KeyEventType.PRESS) {
      if (keyEvent.key === 87 || keyEvent.key === 38) player.w = true;
      if (keyEvent.key === 83 || keyEvent.key === 40) player.s = true;
      if (keyEvent.key === 65 || keyEvent.key === 37) player.a = true;
      if (keyEvent.key === 68 || keyEvent.key === 39) player.d = true;
    } else if (keyEvent.event === KeyEventType.RELEASE) {
      if (keyEvent.key === 87 || keyEvent.key === 38) player.w = false;
      if (keyEvent.key === 83 || keyEvent.key === 40) player.s = false;
      if (keyEvent.key === 65 || keyEvent.key === 37) player.a = false;
      if (keyEvent.key === 68 || keyEvent.key === 39) player.d = false;
    }
  } else if (event.tag === SET_NICK) {
    if (!gameState.players[event.user]) {
      gameState.players[event.user] = {
        id: event.user,
        name: event.name,
        position: { x: gameCanvas.width / 2, y: gameCanvas.height / 2 },
        w: false,
        a: false,
        s: false,
        d: false,
      };
    } else {
      gameState.players[event.user].name = event.name;
    }
  }
  updatePlayerPositions();
}

function updatePlayerPositions() {

  for (const userId in gameState.players) {
    const player = gameState.players[userId];

    if (player.w) player.position.y -= MOVE_SPEED;
    if (player.s) player.position.y += MOVE_SPEED;
    if (player.a) player.position.x -= MOVE_SPEED;
    if (player.d) player.position.x += MOVE_SPEED;

    player.position.x = Math.max(PLAYER_RADIUS, Math.min(gameCanvas.width - PLAYER_RADIUS, player.position.x));
    player.position.y = Math.max(PLAYER_RADIUS, Math.min(gameCanvas.height - PLAYER_RADIUS, player.position.y));
  }
}

function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillText(`Ping: ${client.get_ping()} ms`, 10, 10);
  ctx.fillText(`Server Time: ${client.time()}`, 10, 30);
  ctx.fillText(`Your Pressed Keys: ${Array.from(pressedKeys).join(', ')}`, 10, 50);

  let yOffset = 70;
  for (const userId in gameState.players) {
    const player = gameState.players[userId];
    if (parseInt(userId) !== playerId) {
      ctx.fillText(`Player ${player.name} Keys: ${[player.w ? 'W' : '', player.a ? 'A' : '', player.s ? 'S' : '', player.d ? 'D' : ''].join(', ')}`, 10, yOffset);
      yOffset += 20;
    }
    ctx.fillStyle = generateColor(player.id);
    ctx.beginPath();
    ctx.arc(player.position.x, player.position.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(player.name, player.position.x - PLAYER_RADIUS, player.position.y - PLAYER_RADIUS - 5);
  }
}
