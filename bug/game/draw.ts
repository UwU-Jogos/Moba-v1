import { GameState } from './state.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const mapSize = 32;
const tileSize = canvas.width / mapSize;

export function drawMap(state: GameState) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o mapa
  for (let y = 0; y < mapSize; y++) {
    for (let x = 0; x < mapSize; x++) {
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  // Desenha os jogadores
  for (const playerId in state.players) {
    const player = state.players[playerId];
    const x = player.pos.x;
    const y = player.pos.y;

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Desenha o chefe, se houver
  // if (state.boss) {
  //   const x = state.boss.pos.x;
  //   const y = state.boss.pos.y;
  //   ctx.fillStyle = 'blue';
  //   ctx.beginPath();
  //   ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize / 2, 0, Math.PI * 2);
  //   ctx.fill();
  // }
}
