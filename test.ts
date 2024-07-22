// Importações
import client from "./src/browser/client.js";

const uwuchat = client({ url: "ws://localhost:7171" });

// Definindo tipos
interface Position {
  x: number;
  y: number;
}

interface Player {
  name: string;
  pos: Position;
  color: string;
}

interface State {
  players: { [key: number]: Player };
  tick: number
}

interface PostData {
  cmd: "left" | "right" | "up" | "down";
}

const roller = uwuchat.roller({
  room: 0x9000,
  user: 0x4,

  on_init: (time: number, user: number, data: any): State => {
    return {
      players: {},
      tick: 0,
    };
  },

  on_post: (state: State, time: number, user: number, data: PostData): State => {
    if (state.players[user] === undefined) {
      state.players[user] = {
        name: String(user),
        pos: { x: 256, y: 256 },
        color: `hsl(${Math.random() * 360}, 100%, 50%)`  // Cor aleatória para cada jogador
      };
    } else {
      if (data.cmd === "left") {
        state.players[user].pos.x -= 16;
      }
      if (data.cmd === "right") {
        state.players[user].pos.x += 16;
      }
      if (data.cmd === "up") {
        state.players[user].pos.y -= 16;
      }
      if (data.cmd === "down") {
        state.players[user].pos.y += 16;
      }
    }

    return state;
  },
  on_pass(state, time, delta) {
    return state
  },

  on_tick: [6, (state: State): State => {
    state.tick = (state.tick + 1);

    for (const player_id in state.players) {
      const player = state.players[player_id];

      if (player.pos.x >= 512) { player.pos.x = 512; }
      if (player.pos.x < 0) { player.pos.x = 0; }
      if (player.pos.y >= 512) { player.pos.y = 512; }
      if (player.pos.y < 0) { player.pos.y = 0; }
    }

    return state;
  }]
});
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Failed to get canvas rendering context");
}

function draw(state: State) {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (state) {
    for (const player_id in state.players) {
      const player = state.players[player_id];
      ctx.fillStyle = player.color;
      ctx.fillRect(player.pos.x, player.pos.y, 16, 16);
    }
  }
}

setInterval(() => {
  draw(roller.get_state());
}, 1000 / 30);

// Previne o comportamento padrão da tecla Enter para evitar a reinicialização da página
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }

  if (event.key === "a") {
    roller.post({ cmd: "left" });
  }
  if (event.key === "d") {
    roller.post({ cmd: "right" });
  }
  if (event.key === "w") {
    roller.post({ cmd: "up" });
  }
  if (event.key === "s") {
    roller.post({ cmd: "down" });
  }
});