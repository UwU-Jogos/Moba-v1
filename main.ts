
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
  | { type: EventType.PRESS; player: Player; key: string; tick: number; }
  | { type: EventType.RELEASE; player: Player; key: string; tick: number; }

type Position = {
  x: number;
  y: number;
};

type Player = {
  id: string;
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

type KeyHandler = (event: KeyboardEvent) => void;

// when a key is pressed, the correct event should be created and broadcasted 
// for the chat, as well as render the correct tick for the current player
const handleKeyPress: KeyHandler = (event: KeyboardEvent) => {
  // on key press, we should add an event here? and broadcast for the server
  // we should add here first to keep animation smooth for the player
  // smth like chat.broadcast() and the event
  // and also compute the state
  const newTick = getTick() + 1;
  const evPress = {
    type: EventType.PRESS,
    player: getPlayer(),
    key: event.key,
    tick: newTick 
  } 
  setTick(newTick);
  let state = getState();
  let computedState = computeState(state, evPress);
  console.log(computedState);
  setState(computedState);
  draw(computedState);

  const evTick: GameEvent = {
    type: EventType.TICK,
    tick: newTick + 1
  } 
  draw(computeState(state, evTick));
}

const handleKeyRelease: KeyHandler = (event: KeyboardEvent) => {
  const evRelease = {
    type: EventType.RELEASE,
    player: getPlayer(),
    key: event.key,
    tick: getTick() + 1
  }
  console.log(evRelease)
}

const addKeyboardListeners = (): void => {
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);
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
    ctx.fillStyle = getPlayerColor(player.id);
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

function getPlayer() {
  return {
      id: "player1",
      name: "Alice",
      position: { x: 10, y: 10 },
      w: false,
      a: false,
      s: false,
      d: false
  }
}

var tick = 0;
function getTick() {
  return tick;
}

function setTick(tick: number) {
  tick = tick; 
}

var state: GameState =  {
    tick: getTick(),
    players: [
      {
        id: "player1",
        name: "Alice",
        position: { x: 10, y: 10 },
        w: false,
        a: false,
        s: false,
        d: false
      }
    ]
  };
function getState() {
  return state;
}

function setState(newState: GameState) {
  state = newState;
}


// (0, 0) is top left for the canvas
function main() {
  addKeyboardListeners();
  // player list com from the chat when we read the join event
  // every time a join event is received, a player is added to the list.
  draw(state);
}

window.onload = main;




