import client from "../src/browser/client.js";
import { GameState } from './game/state.js';
import { drawMap } from './game/draw.js';

// Defina os tipos para o estado do jogo e o post

const uwuchat = client({ url: "ws://localhost:7171" });

let state: GameState | null = null;

// Server Logic
// ------------

const roller = uwuchat.roller({
  room: 0x8000,
  user: 0x4,

  // Initial state
  on_init: (time: number, user: number, data: any) => {
    return {
      players: {},
      tick: 0,
      w: false,
      a: false,
      s: false,
      d: false,
    };
  },

  // When a post is made
  // on_post: (state: GameState, time: number, user: number, data: any) => {
  //   if (state.players[user] === undefined) {
  //     state.players[user] = {
  //       name: String(user),
  //       pos: { x: 16, y: 16 },
  //       w: false,
  //       a: false,
  //       s: false,
  //       d: false,
  //     };
  //   }
  //   return state;

  // },
  on_post: (state, time, user, data) => {
    if (state.players[user] === undefined) {
      state.players[user] = {
        name: String(user),
        pos: { x: 16, y: 16 },
        w: false,
        a: false,
        s: false,
        d: false,
      };
    } else {
      if (data.cmd === "left") {
        state.players[user].a = true;
      }
      if (data.cmd === "right") {
        state.players[user].d = true;
      }
      if (data.cmd === "down") {
        state.players[user].s = true;
      }
      if (data.cmd === "up") {
        state.players[user].w = true;
      }
      if (data.cmd === "release_left") {
        state.players[user].a = false;
      }
      if (data.cmd === "release_right") {
        state.players[user].d = false;
      }
      if (data.cmd === "release_down") {
        state.players[user].s = false;
      }
      if (data.cmd === "release_up") {
        state.players[user].w = false;
      }
    }
    return state;
  },

  on_tick: [6, (state: GameState) => {
    state.tick = (state.tick + 1);
  
    // For each player...
    for (var player_id in state.players) {
      var player = state.players[player_id];
  
      // Move player based on pressed keys
      if (player.w) player.pos.y = Math.max(player.pos.y - 1, 0);
      if (player.a) player.pos.x = Math.max(player.pos.x - 2, 0);
      if (player.s) player.pos.y = Math.min(player.pos.y + 1, 31);
      if (player.d) player.pos.x = Math.min(player.pos.x + 2, 31);
    }
  
    return state;
  }],
  // When a tick happens
  // on_tick: [6, (state: GameState) => {
  //   state.tick = (state.tick + 1);

  //   for (const player_id in state.players) {
  //     const player = state.players[player_id];

  //     // Move players within map boundaries
  //     player.pos.x = Math.min(Math.max(player.pos.x, 0), 63);
  //     player.pos.y = Math.min(Math.max(player.pos.y, 0), 31);
  //   }

  //   return state;
  // }],

  // Add on_pass function
  on_pass: (state: GameState, time: number, dt: number) => {
    // Example of state manipulation on pass
    state.tick += 1;
    return state;
  }
});

// Client Inputs
// -------------
const keyState: { [key: string]: boolean } = {};

function handleKeyPress(key: string) {
  keyState[key] = true;
  updatePlayerPosition();
}

function handleKeyRelease(key: string) {
  keyState[key] = false;
}

function updatePlayerPosition() {
  if (state) {
    for (const player_id in state.players) {
      const player = state.players[player_id];

      if (keyState['a']) {
        player.pos.x -= 2;
      }
      if (keyState['d']) {
        player.pos.x += 2;
      }
      if (keyState['w']) {
        player.pos.y -= 1;
      }
      if (keyState['s']) {
        player.pos.y += 1;
      }

      // Keep players within map boundaries
      player.pos.x = Math.min(Math.max(player.pos.x, 0), 31);
      player.pos.y = Math.min(Math.max(player.pos.y, 0), 31)
    }
  }
  console.log(state);
  return state
  
}

window.addEventListener('keydown', (event) => {
  handleKeyPress(event.key);
  if (event.key === "\u0003") {
    process.exit();
  } else {
    handleKeyPress(event.key);
    roller.post({ cmd: event.key });
    
  }
});

window.addEventListener('keyup', (event) => {
  handleKeyRelease(event.key);
  roller.post({ cmd: `release_${event.key}` });
});

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);

// process.stdin.on("keypress", (str, key) => {
//   if (key.sequence === "\u0003") {
//     process.exit();
//   } else {
//     handleKeyPress(key.name);
//     roller.post({ cmd: key.name });
    
//   }
// });

// process.stdin.on("keyup", (str, key) => {
//   handleKeyRelease(key.name);
//   roller.post({ cmd: `release_${key.name}` });
// });

// Client Render
// -------------
function draw(state: GameState | null): string {
  const map: string[][] = [];

  for (let i = 0; i < 32; ++i) {
    const row: string[] = [];
    for (let j = 0; j < 64; ++j) {
      row.push("_");
    }
    map.push(row);
  }

  if (state) {
    for (const player_id in state.players) {
      const player = state.players[player_id];

      const x = Math.min(Math.max(player.pos.x, 0), 63);
      const y = Math.min(Math.max(player.pos.y, 0), 31);

      map[y][x] = player.name;
    }
  }

  return map.map(row => row.join("")).join("\n");
}

setInterval(() => {
  console.clear();
  console.log(drawMap(roller.get_state()));
}, 1000 / 30);
