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
  events: GameEvent[];
}

type StateHistory = GameState[];


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

function addEvent(event: GameEvent, events: GameEvent[]): GameEvent[] {
  return [...events, event];
}

function newGameState(tick: number, players: Player[], events: GameEvent[]): GameState {
    return {
      tick: tick,
      players: players,
      events: events
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
  const events = addEvent(event, state.events);
  const statePlayers = movePlayers(state.players);
  console.log(statePlayers);

  switch (event.type) {
    case EventType.TICK:
      return newGameState(tick, statePlayers, events);

    case EventType.PLAYER_JOINED:
      return newGameState(tick, addPlayer(event.player, statePlayers), events);

    case EventType.GAME_STARTED: 
      return newGameState(tick, statePlayers, events);

    case EventType.PRESS:
      const playerPress = playerPressed(event.key, event.player, true);
      return newGameState(tick, newPlayerList(playerPress, statePlayers), events);

    case EventType.RELEASE:
      const player = playerPressed(event.key, event.player, false);
      const players = newPlayerList(player, statePlayers);
      return newGameState(tick, players, events);

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

// (0, 0) is top left for the canvas
function main() {
  const events: GameEvent[] = [
    { type: EventType.TICK, tick: 1 },

    { type: EventType.PRESS, player: {
      id: "player1",
      name: "Alice",
      position: { x: 10, y: 10 },
      w: false,
      a: false,
      s: false,
      d: false
    }, key: "d", tick: 2 },

    { type: EventType.TICK, tick: 3 },

    { type: EventType.TICK, tick: 4 },

    { type: EventType.TICK, tick: 5 }
  ];
    
  const initialState: GameState = {
    tick: 0,
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
    ],
    events: []
  };

  let state = initialState;
  draw(state);
  // Process each event
  for (const event of events) {
    state = computeState(state, event);
    draw(state);
  }
}

window.onload = main;




