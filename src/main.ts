import client from "./client";
import { List } from "immutable";

enum EventType {
  PLAYER_JOINED,
  GAME_STARTED,
  TICK,
  PRESS,
  RELEASE
}

type GameEvent =
  | { type: EventType.PLAYER_JOINED; player: Player; tick: number; }
  | { type: EventType.GAME_STARTED; tick: number; }
  | { type: EventType.TICK; tick: number; }
  | { type: EventType.PRESS; player: number; key: string; tick: number; }
  | { type: EventType.RELEASE; player: number; key: string; tick: number; }

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

type GameState = {
  tick: number;
  players: List<Player>;
}

type StateHistory = List<GameState>;

// ----------- KeyBoard Events Handling ------------------
type KeyHandler = (roller: any, event: KeyboardEvent) => void;

const handleKeyPress: KeyHandler = (roller: any, event: KeyboardEvent) => {
  const pressEvent: GameEvent = {
    type: EventType.PRESS,
    player: thisPlayer(),
    key: event.key,
    tick: 0  
  }
  roller.post(pressEvent);
}


const handleKeyRelease: KeyHandler = (roller: any, event: KeyboardEvent) => {
  const releaseEvent: GameEvent = {
    type: EventType.RELEASE,
    player: thisPlayer(),
    key: event.key,
    tick: 0  
  }
  roller.post(releaseEvent);
}

const addKeyboardListeners = (roller: any): void => {
  document.addEventListener("keydown", (event) => handleKeyPress(roller, event));
  document.addEventListener("keyup", (event) => handleKeyRelease(roller, event));
}

// ---------------- Local Player Handling -----------------
let thisPlayerId = 0x0;

function thisPlayer() {
  return thisPlayerId;
}
function setThisPlayer(p: number) {
  thisPlayerId = p;
}

function newPlayer(pid: number, name: string): Player {
  return {
      id: pid,
      name: name,
      position: { x: 50, y: 50 },
      w: false,
      a: false,
      s: false,
      d: false
    }
}

function getPlayerById(playerId: number, players: List<Player>): Player | undefined {
  return players.find(player => player.id === playerId);
}
// -------------------------------------------------------


function draw(state: GameState): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Unable to get 2D context");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawPlayer = (player: Player): void => {
    ctx.beginPath();
    ctx.arc(player.position.x, player.position.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = getPlayerColor((player.id).toString());
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText(player.name, player.position.x - 20, player.position.y - 15);
  };

  state.players.forEach(drawPlayer);

  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.fillText(`Tick: ${state.tick}`, 10, 20);
}

function newPlayerList(updatedPlayer: Player, players: List<Player>): List<Player> {
  return players.map(player =>
    player.id === updatedPlayer.id ? updatedPlayer : player 
  );
}

function addPlayer(newPlayer: Player, players: List<Player>): List<Player> {
  return players.push(newPlayer);
}

function newGameState(tick: number, players: List<Player>): GameState {
    return {
      tick: tick,
      players: players,
    }
}

function initialGameState(p: Player): GameState {
  return {
    tick: 0,
    players: List([p])
  }
}

function playerPressed(key: string, player: Player, pressed: boolean): Player {
  switch (key) {
    case "a":
      return { ...player, a: pressed };
    case "d":
      return { ...player, d: pressed };
    case "w":
      return { ...player, w: pressed };
    case "s":
      return { ...player, s: pressed };
    default:
      return player;
  }
}

function movePlayers(players: List<Player>): List<Player> {
  const movePlayer = (player: Player): Player => {
    const newPosition = {
      x: player.position.x + (player.d ? 3 : 0) - (player.a ? 3 : 0),
      y: player.position.y + (player.s ? 3 : 0) - (player.w ? 3 : 0),
    };
    return { ...player, position: newPosition };
  }
  return players.map(movePlayer);
}

function computeState(state: GameState, event: GameEvent): GameState {
  const tick = state.tick;
  const statePlayers = state.players;

  switch (event.type) {
    case EventType.TICK:
      return newGameState(tick + 1, statePlayers);

    case EventType.PLAYER_JOINED:
      return newGameState(tick, addPlayer(event.player, statePlayers));

    case EventType.GAME_STARTED: 
      return newGameState(tick, statePlayers);

    case EventType.PRESS:
      let p = getPlayerById(event.player, statePlayers);
      if(!p) {
        return state;
      }
      const playerPress = playerPressed(event.key, p, true);
      return newGameState(tick, movePlayers(newPlayerList(playerPress, statePlayers)));

    case EventType.RELEASE:
      let pl = getPlayerById(event.player, statePlayers);
      if(!pl) {
        return state;
      }
      const player = playerPressed(event.key, pl, false);
      const players = movePlayers(newPlayerList(player, statePlayers));
      return newGameState(tick, players);

    default:
      return state;
  }
}

function getPlayerColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function enterRoom() {
    const roomId: number = Number((document.getElementById('roomId') as HTMLInputElement).value);
    const nickname: string = (document.getElementById('nickname') as HTMLInputElement).value;
    let thisPlayerId = generateHexId();
    const activePlayer = newPlayer(thisPlayerId, nickname);

    const formDiv = document.getElementById('formDiv');
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

    if (formDiv && canvas) {
        formDiv.style.display = 'none';
        canvas.style.display = 'block';
    } 

    // next feat: do clamping on the canvas
    const rect = canvas?.getBoundingClientRect() || { left: 10, top: 10, height: 500, width: 500 };
    const canvasX = rect.left;
    const canvasY = rect.top;
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const uwuchat = client({ url: "ws//127.0.0.1:7171" });

    let roller = uwuchat.roller({
      room: roomId,
      user: thisPlayerId,

      on_init: (time, user, data) => { 
        const joinedEv: GameEvent = {
          type: EventType.PLAYER_JOINED,
          player: activePlayer,
          tick: 0
        }
        roller.post(joinedEv);
        return initialGameState(activePlayer);
      },

      // when a post is made, compute state
      on_post: (state, time, user, data) => {
        let newState = computeState(state, data);
        return newState;
      },

      on_tick: [30, (state) => {
        return state;
      }],

      on_pass: (state, time, delta) => {
        return state;
      }
    }); 

    const joined: GameEvent = {
      type: EventType.PLAYER_JOINED,
      player: activePlayer,
      tick: 0
    }

    roller.post(joined);
    setThisPlayer(thisPlayerId); 
    main(roller);
}

function generateHexId(): number {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 16777216); // 16777216 is 0xFFFFFF in decimal
  return Number(`${timestamp}${randomPart}`);
}

function main(roller: any) {
  addKeyboardListeners(roller);
  setInterval(function render() {
    let state = roller.get_state();
    draw(state);
  }, 1000 / 30);
}

(window as any).enterRoom = enterRoom

