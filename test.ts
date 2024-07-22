// Importações
import client from "./src/browser/client.js";

const uwuchat = client({ url: "ws://localhost:7171" });

interface Position {
  x: number;
  y: number;
}

interface Player {
  name: string;
  pos: Position;
}

interface State {
  players: { [key: number]: Player };
  tick: {
    name: string;
    pos: Position;
  };
}

interface PostData {
  cmd: "left" | "right";
}

const roller = uwuchat.roller({
  room: 0x2000,
  user: 0x4,

  on_init: (time: number, user: number, data: any): State => {
    return {
      players: {},
      tick: { name: "@", pos: { x: 0, y: 0 } }
    };
  },

  on_post: (state: State, time: number, user: number, data: PostData): State => {
    if (state.players[user] === undefined) {
      state.players[user] = {
        name: String(user),
        pos: { x: 256, y: 256 },
      };
    } else {
      if (data.cmd === "left") {
        state.players[user].pos.x -= 16;
      }
      if (data.cmd === "right") {
        state.players[user].pos.x += 16;
      }
    }

    return state;
  },
  on_pass(state, time, delta) {
    
  },
  on_tick: [6, (state: State): State => {
    state.tick.pos.x = (state.tick.pos.x + 16) % 512;
    state.tick.pos.y = (state.tick.pos.y + 16) % 512;

    for (const player_id in state.players) {
      const player = state.players[player_id];

      if (player.pos.x >= 512) { player.pos.x = 512; }
      if (player.pos.x < 0) { player.pos.x = 0; }
      if (player.pos.y >= 512) { player.pos.y = 512; }
      if (player.pos.y < 0) { player.pos.y = 0; }

      if (player.pos.x === state.tick.pos.x && player.pos.y === state.tick.pos.y) {
        player.pos.x = 256;
        player.pos.y = 256;
      }
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

  for (let y = 0; y < 512; y += 16) {
    for (let x = 0; x < 512; x += 16) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, 16, 16);
    }
  }

  if (state) {
    for (const player_id in state.players) {
      const player = state.players[player_id];
      ctx.fillStyle = "blue";
      ctx.fillRect(player.pos.x, player.pos.y, 16, 16);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(state.tick.pos.x, state.tick.pos.y, 16, 16);
  }
}

setInterval(() => {
  draw(roller.get_state());
}, 1000 / 30);

document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    roller.post({ cmd: "left" });
  }
  if (event.key === "d") {
    roller.post({ cmd: "right" });
  }
});
