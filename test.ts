// Importações
import client from "./src/browser/client.js";
import readline from "readline";

// Configuração do cliente
const uwuchat = client({ url: "ws://localhost:7171" });

// Definindo tipos para o estado do jogo e dados dos jogadores
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

// Lógica do Servidor
// -------------------

const roller = uwuchat.roller({
  room: 0x2000,
  user: 0x4,

  // Estado inicial
  on_init: (time: number, user: number, data: any): State => {
    return {
      players: {},
      tick: { name: "@", pos: { x: 0, y: 0 } }
    };
  },

  // Quando um post é feito
  on_post: (state: State, time: number, user: number, data: PostData): State => {
    // Se o jogador não existe, cria-o
    if (state.players[user] === undefined) {
      state.players[user] = {
        name: String(user),
        pos: { x: 16, y: 0 },
      };

    // Caso contrário, move-o
    } else {
      if (data.cmd === "left") {
        state.players[user].pos.x -= 2;
      }
      if (data.cmd === "right") {
        state.players[user].pos.x += 2;
      }
    }

    return state;
  },

  on_pass(state, time, delta) {
    return state
  },

  // Quando um tick acontece
  on_tick: [6, (state: State): State => {
    // Move o boss
    state.tick.pos.x = (state.tick.pos.x + 1) % 32;

    // Para cada jogador
    for (const player_id in state.players) {
      const player = state.players[player_id];

      // Move o jogador para dentro do mapa
      if (player.pos.x >= 31) { player.pos.x = 31; }
      if (player.pos.x < 0) { player.pos.x = 0; }

      // Mata o jogador se o boss estiver sobre ele
      if (player.pos.x === state.tick.pos.x) {
        player.pos.x = 0;
      }
    }

    return state;
  }]
});

// Entrada do Cliente
// -------------------

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str: string, key: readline.Key) => {
  if (key.name === "a") {
    roller.post({ cmd: "left" });
  }

  if (key.name === "d") {
    roller.post({ cmd: "right" });
  }

  if (key.sequence === "\u0003") {
    process.exit();
  }
});

// Renderização do Cliente
// -----------------------

function draw(state: State): string {
  const map: string[] = Array(32).fill("_");

  if (state) {
    for (const player_id in state.players) {
      const player = state.players[player_id];
      map[player.pos.x] = player.name;
    }
    map[state.tick.pos.x] = state.tick.name;
  }

  return map.join("");
}

setInterval(() => {
  console.clear();
  console.log(draw(roller.get_state()));
}, 1000 / 30);
