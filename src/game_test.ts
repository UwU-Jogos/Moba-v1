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
  // position: Position;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  wCounter: number;
  aCounter: number;
  sCounter: number;
  dCounter: number;
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

const UPDATE_INTERVAL_MS = 1000 / 240; // Atualizar a cada 60 vezes por minuto (60 FPS)
let lastUpdateTime = 0;
let tick = 1;

async function handleLogin() {
  username = usernameInput.value;
  playerId = lib.encodeUsername(username);
  room = parseInt(roomInput.value);
  if (username && room) {
    await client.init('ws://server.uwu.games');
    client.recv(room, handleGameMessage);
    client.send(room, lib.encode({ tag: SET_NICK, user: playerId, name: username }));

    loginScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    addKeyboardListeners();
    // setInterval(updateGameState, tickRate); // update game state at tick rate
    requestAnimationFrame(gameLoop);
  }
}

loginButton.onclick = handleLogin;

function addKeyboardListeners(): void {
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
}

function sendKeyEvent(key: number, event: KeyEventType) {
  const keyEvent = lib.encodeKey({ key, event });
  client.send(room, lib.encode({ tag: COMMAND_MESSAGE, user: playerId, time: client.time(), key: keyEvent }));
}

function handleGameMessage(msg: Uint8Array) {
  const decoded = lib.decode(msg);
  computeState(decoded);
  // updateGameState();
}
function processTimeBasedUpdates() {
  for (const userId in gameState.players) {
    const player = gameState.players[userId];
    if (player.w) player.wCounter++;
    if (player.a) player.aCounter++;
    if (player.s) player.sCounter++;
    if (player.d) player.dCounter++;
    if ((player.w) || (player.s) || (player.a) || (player.d)) {
      console.log(player);
    } 


  }
  
}

function computeState(event?: GameMessage) {
  if (event) {
    if (event.tag === COMMAND_MESSAGE) {
      if (!gameState.players[event.user]) {
        gameState.players[event.user] = {
          id: event.user,
          name: '',
          w: false,
          a: false,
          s: false,
          d: false,
          wCounter: 0,
          aCounter: 0,
          sCounter: 0,
          dCounter: 0,
        };
      }
      const keyEvent = lib.decodeKey(event.key);
      const player = gameState.players[event.user];
      const currentTime = event.time;
      console.log(currentTime);
      

      if (keyEvent.event === KeyEventType.PRESS) {
        if ((keyEvent.key === 87) || (keyEvent.key === 38)) {
          player.w = true;
          console.log(tick);
          tick +=1
        }
        
        if ((keyEvent.key === 83) || (keyEvent.key === 40)) player.s = true;
        if ((keyEvent.key === 65) || (keyEvent.key === 37)) player.a = true;
        if ((keyEvent.key === 68) || (keyEvent.key === 39)) player.d = true;
      } else if (keyEvent.event === KeyEventType.RELEASE) {
        if ((keyEvent.key === 87) || (keyEvent.key === 38)) {
          player.w = false;
          player.wCounter = 0;
        }
        if ((keyEvent.key === 83) || (keyEvent.key === 40)) {
          player.s = false;
          player.sCounter = 0;
        }
        if ((keyEvent.key === 65) || (keyEvent.key === 37)) {
          player.a = false;
          player.aCounter = 0;
        }
        if ((keyEvent.key === 68) || (keyEvent.key === 39)) {
          player.d = false;
          player.dCounter = 0;
        }
      }
    } else if (event.tag === SET_NICK) {
      if (!gameState.players[event.user]) {
        gameState.players[event.user] = {
          id: event.user,
          name: event.name,
          w: false,
          a: false,
          s: false,
          d: false,
          wCounter: 0,
          aCounter: 0,
          sCounter: 0,
          dCounter: 0,
        };
      } else {
        gameState.players[event.user].name = event.name;
      }
    }
  }

  // Atualizações baseadas em tempo
  processTimeBasedUpdates();
}
// function updateGameState() {
//   const speed = 0.5; // speed of movement, adjust as needed

//   for (const userId in gameState.players) {
//     const player = gameState.players[userId];

//     if (player.w) player.position.y -= speed * player.wCounter;
//     if (player.s) player.position.y += speed * player.sCounter;
//     if (player.a) player.position.x -= speed * player.aCounter;
//     if (player.d) player.position.x += speed * player.dCounter;

//     player.position.x = Math.max(10, Math.min(gameCanvas.width - 10, player.position.x));
//     player.position.y = Math.max(10, Math.min(gameCanvas.height - 10, player.position.y));
//   }
  
// }
function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillText(`Ping: ${client.get_ping()} ms`, 10, 10);
  ctx.fillText(`Server Time: ${client.time()}`, 10, 30);
  ctx.fillText(`Your Pressed Keys: ${Array.from(pressedKeys).join(', ')}`, 10, 50);

  let yOffset = 70;
  for (const userId in gameState.players) {
    const player = gameState.players[userId];
    ctx.fillText(`Player ${player.name} Keys: ${[
      player.w ? `W(${player.wCounter.toFixed(2)})` : '',
      player.a ? `A(${player.aCounter.toFixed(2)})` : '',
      player.s ? `S(${player.sCounter.toFixed(2)})` : '',
      player.d ? `D(${player.dCounter.toFixed(2)})` : ''
    ].join(', ')}`, 10, yOffset);
    yOffset += 20;
  }
}


function calculateKeyDuration(start: number, end: number): number {
  const duration = (end - start) / 240; // Assumindo 240 atualizações por segundo
  return duration;
}
// function gameLoop() {
//   for (const userId in gameState.players) {
//     const player = gameState.players[userId];
//     if (player.w) player.wCounter++;
//     if (player.a) player.aCounter++;
//     if (player.s) player.sCounter++;
//     if (player.d) player.dCounter++;
//   }

//   draw();
//   requestAnimationFrame(gameLoop);
// }
function gameLoop(currentTime: number) {
  currentTime = client.time()
  // Verifica se o intervalo de atualização passou
  if (currentTime - lastUpdateTime >= UPDATE_INTERVAL_MS) {
    computeState(); // Recalcula o estado do jogo

    lastUpdateTime = currentTime; // Atualiza o tempo da última atualização
  }

  draw(); // Desenha o estado atual do jogo
  requestAnimationFrame(gameLoop);
}