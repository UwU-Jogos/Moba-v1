// Importações
import client from "../browser/client.js";

interface Position {
  x: number;
  y: number;
}

interface Player {
  name: string;
  pos: Position;
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
}

interface State {
  players: { [key: number]: Player };
  tick: number;
}

interface PostData {
  cmd: "left" | "right" | "up" | "down" | "noop";
}

let state: State | null = null;

// Funções auxiliares
function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Obtendo parâmetros da URL
const roomId = getQueryParam('roomId');
const playerName = getQueryParam('playerName');
console.log(roomId, playerName);

// Configuração do cliente
if (!roomId || !playerName) {
  console.error('ID da sala ou nome do personagem não fornecidos.');
  throw new Error('ID da sala ou nome do personagem não fornecidos.');
}

const uwuchat = client({ url: "ws://localhost:7171" });

const keyState: { [key: string]: boolean } = {};
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const tickDisplay = document.getElementById('tickDisplay') as HTMLDivElement;
const ctx = canvas.getContext('2d');
const ballRadius = 8;
const ballSpeed = 4;


// const stateHistory: State[] = [state];
const roller = uwuchat.roller({
  room: parseInt(roomId, 10),
  user: parseInt(playerName, 10),

  // Estado inicial
  on_init: (time: number, user: number, data: any): State => {
    return {
      players: {},
      tick: 0
    };
  },
  on_pass(state, time, delta) {
    return state
  },
  // Quando um post é feito
  on_post: (state: State, time: number, user: number, data: PostData): State => {
    if (state.players[user] === undefined) {
      state.players[user] = {
        name: playerName,
        pos: { x: canvas ? canvas.width / 2 : 0, y: canvas ? canvas.height / 2 : 0 },
        w: false,
        s: false,
        a: false,
        d: false,
      };
    } else {
      if (data.cmd === "left") {
        state.players[user].pos.x -= ballSpeed;
      }
      if (data.cmd === "right") {
        state.players[user].pos.x += ballSpeed;
      }
      if (data.cmd === "up") {
        state.players[user].pos.y -= ballSpeed;
      }
      if (data.cmd === "down") {
        state.players[user].pos.y += ballSpeed;
      }
    }

    return state;
  },

  // Quando um tick acontece
  on_tick: [60, (state: State): State => {
    state.tick = (state.tick + 1)

    for (const player_id in state.players) {
      const player = state.players[player_id];

      player.pos.x = Math.max(ballRadius, Math.min(canvas.width - ballRadius, player.pos.x));
      player.pos.y = Math.max(ballRadius, Math.min(canvas.height - ballRadius, player.pos.y));
    }

    return state;
  }]
});



function handleKeyDown(event: KeyboardEvent): void {
  // keyState[event.key] = true;
  if (["w", "a", "s", "d"].includes(event.key)) {
    event.preventDefault();
    keyState[event.key] = true;
    if (keyState["a"]) roller.post({ cmd: "left" });
    if (keyState["d"]) roller.post({ cmd: "right" });
    if (keyState["w"]) roller.post({ cmd: "up" });
    if (keyState["s"]) roller.post({ cmd: "down" });
    console.log(`Key "${event.key}" pressed.`);
    console.log(keyState);
  }
}

function handleKeyUp(event: KeyboardEvent): void {
  keyState[event.key] = false;
  console.log(`Key "${event.key}" released.`);
  console.log(keyState);
}

function addKeyboardListeners(): void {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
}

function compute_state(state: State, event: PostData): State {
  const newPlayers = { ...state.players };
  Object.keys(newPlayers).forEach(playerId => {
    // const player = newPlayers[parseInt(playerId)];
    const player = newPlayers[parseInt(playerId)];
    // Atualizar a posição do jogador com base no comando
    switch (event.cmd) {
      case 'up':
        player.pos.y -= ballSpeed;
        break;
      case 'down':
        player.pos.y += ballSpeed;
        break;
      case 'left':
        player.pos.x -= ballSpeed;
        break;
      case 'right':
        player.pos.x += ballSpeed;
        break;
      case 'noop':
        // No-op: Não faz nada
        break;
    }
    // Atualizar flags de movimentação
    player.w = event.cmd === 'up';
    player.s = event.cmd === 'down';
    player.a = event.cmd === 'left';
    player.d = event.cmd === 'right';

    player.pos.x = Math.max(ballRadius, Math.min(canvas.width - ballRadius, player.pos.x));
    player.pos.y = Math.max(ballRadius, Math.min(canvas.height - ballRadius, player.pos.y));
  });

  return {
    ...state,
    players: newPlayers,
    tick: state.tick + 1
  };
}

function getPlayerColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function draw(state: State): void {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  const players = state.players;
  Object.keys(players).forEach(playerId => {
    const player = players[parseInt(playerId)];
    ctx.beginPath();
    ctx.arc(player.pos.x, player.pos.y, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`; // Cor da bola
    ctx.fillStyle = getPlayerColor(playerId); // Cor da bola
    
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.font = '12px Arial';
    ctx.fillText(playerId, player.pos.x - 20, player.pos.y - 15);
    
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.fillText(`Tick: ${state.tick}`, 10, 20);
  });
}

// function updateTickDisplay(): void {
//   if (state) {
//     if (tickDisplay) {
//       tickDisplay.textContent = `Tick: ${state.tick}`;
//     }
//   }
// }

function gameLoop(): void {
  // Atualizar o estado do jogo e adicionar ao histórico
  state = roller.get_state();
  if (state) {
    state = compute_state(state, { cmd: 'noop' });
    draw(state);
    // updateTickDisplay();
  }
  requestAnimationFrame(gameLoop); // Schedule the next frame
  // stateHistory.push(state);
}

function main(): void {
  if (!ctx) {
    console.error('Failed to get canvas 2D context');
    return;
  }
  addKeyboardListeners();
  gameLoop();
}
main();
