import client from "./client";

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
  players: Player[];
}

type StateHistory = GameState[];

type KeyHandler = (roller: any, event: KeyboardEvent) => void;

function thisPlayer() {
  return 0x2;
}

// when a key is pressed, the correct event should be created and broadcasted 
// for the chat, as well as render the correct tick for the current player
const handleKeyPress: KeyHandler = (roller: any, event: KeyboardEvent) => {
  // should post a game event
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
  document.addEventListener("keydown", (event) => handleKeyPress(event, roller));
  document.addEventListener("keyup", (event) => handleKeyRelease(event, roller));
}

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

  state.players.map(drawPlayer);

  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.fillText(`Tick: ${state.tick}`, 10, 20);
}

function newPlayerList(updatedPlayer: Player, players: Player[]): Player[] {
  return players.map(player =>
    player.id === updatedPlayer.id ? updatedPlayer : player 
  );
}

function addPlayer(newPlayer: Player, players: Player[]): Player[] {
  return [...players, newPlayer];
}

function newGameState(tick: number, players: Player[]): GameState {
    return {
      tick: tick,
      players: players,
    }
}

function initialGameState(): GameState {
  return {
    tick: 0,
    players: []
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

function movePlayers(players: Player[]): Player[] {
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
  const tick = state.tick + 1;
  const statePlayers = movePlayers(state.players);

  switch (event.type) {
    case EventType.TICK:
      return newGameState(tick, statePlayers);

    case EventType.PLAYER_JOINED:
      return newGameState(tick, addPlayer(event.player, statePlayers));

    case EventType.GAME_STARTED: 
      return newGameState(tick, statePlayers);

    case EventType.PRESS:
      const playerPress = playerPressed(event.key, event.player, true);
      return newGameState(tick, newPlayerList(playerPress, statePlayers));

    case EventType.RELEASE:
      const player = playerPressed(event.key, event.player, false);
      const players = newPlayerList(player, statePlayers);
      return newGameState(tick, players);

    default:
      const _exhaustiveCheck: never = event;
      throw new Error(`Unhandled event type: ${_exhaustiveCheck}`);
  }
}

// just ignore
function getPlayerColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function buildEvent(data: any): GameEvent {
  return {
    type: EventType.TICK, 
    tick: data.tick
  } 
}

function enterRoom() {
    const uwuchat = client({ url: "ws//127.0.0.1:7171" });

    let roller = uwuchat.roller({
      room: 0x600,
      user: 0x2,

      on_init: (time, user, data) => {
        return initialGameState();
      },

      // when a post is made, compute state
      on_post: (state, time, user, data) => {
        // how to pass the tick?
        return computeState(state, 0);
      },

      on_tick: [20, (state) => {
        // clamp player position to be in the map
        // in theory here we should also compute state
        return state;
      }],

      on_pass: (state, time, delta) => {
        return state;
      }
    });

    const roomId = (document.getElementById('roomId') as HTMLInputElement).value;
    console.log(`ENTERED ROOM: ${roomId}`);

    const formDiv = document.getElementById('formDiv');
    const canvas = document.getElementById('canvas');

    if (formDiv && canvas) {
        formDiv.style.display = 'none';
        canvas.style.display = 'block';
    }

    console.log(roller);
    console.log(roller.get_state());
    roller.post({ savio: "o sabio" });
    console.log(roller.get_ping());
    console.log(roller.get_time());

    (window as any).roller = roller;
    main(roller);
}

// (0, 0) is top left for the canvas
function main(roller: any) {
  addKeyboardListeners(roller);
  
  setInterval(function render() {
    draw(roller.get_state());
  }, 1000 / 30);
}

(window as any).enterRoom = enterRoom

