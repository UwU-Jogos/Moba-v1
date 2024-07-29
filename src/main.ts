import UwUChat2Client from "./client";
import lib from "./lib";
import { List } from "immutable";

const enum MessageType {
  COMMAND = 0,
  SET_NICK = 1,
  TICK = 2
};

// 30 FPS
const TICK = 100;
const TICK_RATE = 1000 / TICK;

type GameMessage = 
  | { tag: 0, user: number, time: number, key: Uint8Array } 
  | { tag: 1, user: number, name: string } 

const enum KeyEventType {
  PRESS = 1,
  RELEASE = 0
}

type KeyEvent = {
  key: number,
  event: KeyEventType
}

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
  players: List<Player>;
  tick: number;
  messages: GameMessage[];
  tickSet: boolean;
}

type StateHistory = GameState[]

// ---------------- Local Player Handling -----------------
let thisPlayerId = 0x0;

function thisPlayer() {
  return thisPlayerId;
}
function setThisPlayer(p: number) {
  thisPlayerId = p;
}
// --------------------------------------------------------

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

function updatePlayer(updatedPlayer: Player, players: List<Player>): List<Player> {
  return players.map(player =>
    player.id === updatedPlayer.id ? updatedPlayer : player 
  );
}

function addPlayer(newPlayer: Player, players: List<Player>): List<Player> {
  return players.push(newPlayer);
}
function addMessageToQueue(state: GameState, message: GameMessage): GameState {
  const sortedMessages = [...state.messages, message];
  if ('time' in message && !state.tickSet) {
    return {
      ...state,
      tick: message.time,
      messages: sortedMessages,
      tickSet: true
    }
  }
  return {
    ...state,
    messages: sortedMessages
  }
}

function newGameState(players: List<Player>, tick: number, messages: GameMessage[], tickSet: boolean): GameState {
    return {
      players: players,
      tick: tick,
      messages: messages,
      tickSet: tickSet
    }
}

function initialGameState(): GameState {
  return {
    players: List(),
    tick: 0,
    messages: [],
    tickSet: false
  }
}

function playerPressed(key: number, player: Player, pressed: boolean): Player {
  switch (key) {
    case (97): return { ...player, a: pressed };
    case (100): return { ...player, d: pressed };
    case (119): return { ...player, w: pressed };
    case (115): return { ...player, s: pressed };
    default: return player;
  }
}

function movePlayers(players: List<Player>): List<Player> {
  const canvasX = 1;
  const canvasY = 1;
  const canvasWidth = 1024;
  const canvasHeight = 800;
  const playerRadius = 10;

  const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

  const movePlayer = (player: Player): Player => {
    const speed = 2;
    const velocity = {
      x: (player.d ? speed : 0) - (player.a ? speed : 0),
      y: (player.s ? speed : 0) - (player.w ? speed : 0),
    };

    const newPosition = {
      x: clamp(
        player.position.x + velocity.x,
        canvasX + playerRadius,
        canvasX + canvasWidth - playerRadius
      ),
      y: clamp(
        player.position.y + velocity.y,
        canvasY + playerRadius,
        canvasY + canvasHeight - playerRadius
      ),
    };
    return { ...player, position: newPosition };
  }
  return players.map(movePlayer);
}

function removeMessage(messages: GameMessage[], messageToRemove: GameMessage): GameMessage[] {
  return messages.filter(msg => msg !== messageToRemove);
}

function processMessage(state: GameState, message: GameMessage): GameState {
  switch (message.tag) {
    case MessageType.COMMAND:
      const decKey: KeyEvent = lib.decodeKey(message.key);
      const player = getPlayerById(message.user, state.players);
      if (!player) { 
        return {
          ...state,
          messages: removeMessage(state.messages, message)
        };
      }
      const pressed = decKey.event === KeyEventType.PRESS;
      const playerPress = playerPressed(decKey.key, player, pressed);
      return {
        ...state,
        players: updatePlayer(playerPress, state.players),
        messages: removeMessage(state.messages, message)
      };

    case MessageType.SET_NICK:
      const existingPlayer = getPlayerById(message.user, state.players);
      if (existingPlayer) {
        const updatedExisting = {
          ...existingPlayer,
          name: message.name
        };

        return {
          ...state,
          players: updatePlayer(updatedExisting, state.players),
          messages: removeMessage(state.messages, message)
        };
      } else {
        const playerJoined = newPlayer(message.user, message.name);
        return {
          ...state,
          players: addPlayer(playerJoined, state.players),
          messages: removeMessage(state.messages, message)
        };
      }

    // tick falls back here
    default:
      return {
        ...state,
        messages: removeMessage(state.messages, message),
      };
  }
}

function computeState(state: GameState): GameState {
  const messagesToProcess = state.messages.filter(msg => 
    !('time' in msg) || (msg.time === state.tick)
  );

  const processedState = messagesToProcess.reduce(
    (currentState, message) => processMessage(currentState, message),
    state
  );

  return {
    ...processedState,
    players: movePlayers(processedState.players),
    tick: gameState.tick + TICK_RATE 
  };
}

function checkAndRollback(state: GameState): GameState {
  const messageNeedingRollback = state.messages.find(msg => 
    'time' in msg && msg.time < state.tick && msg.time !== 0
  );

  if (!messageNeedingRollback || !('time' in messageNeedingRollback)) {
    return state;
  }

  console.log("ROLLING BACK");
  const rollbackTick = messageNeedingRollback.time;
  const rollbackState = stateHistory.find(s => s.tick === rollbackTick);

  if (!rollbackState) {
    console.error("Unable to find state for rollback");
    return state;
  }

  return rebuildState(rollbackState, state.tick);
}

function rebuildState(startState: GameState, endTick: number): GameState {
  let currentState = startState;

  while (currentState.tick < endTick) {
    currentState = computeState(currentState);
  }

  return currentState;
}

function addToStateHistory(state: GameState) {
  stateHistory.push(state);
}

let gameState: GameState = initialGameState();
let messageQueue: GameMessage[] = [];
let stateHistory: StateHistory = [];

function enterRoom() {
  const roomId: number = Number((document.getElementById('roomId') as HTMLInputElement).value);
  const nickname: string = (document.getElementById('nickname') as HTMLInputElement).value;

  const formDiv = document.getElementById('formDiv');
  
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

  let thisPlayerId = generateId();
  setThisPlayer(thisPlayerId);

  if (formDiv && canvas) {
    formDiv.style.display = 'none';
    canvas.style.display = 'block';
  }

  const client = new UwUChat2Client();

  let initTime: number = client.time();

  client.init('ws://localhost:8080').then(() => {
    console.log("Connected to server");   

    sendPlayerJoinedMessage();

    client.recv(roomId, (msg: Uint8Array) => {
      const decodedMessage = lib.decode(msg);
      if (decodedMessage.user !== thisPlayer()) {
        messageQueue.push(decodedMessage);
      }
    });
  })

  
  function sendPlayerJoinedMessage() {
    const setNickMessage = {
      tag: MessageType.SET_NICK,
      user: thisPlayer(),
      name: nickname
    } as GameMessage;

    messageQueue.push(setNickMessage);
    client.send(roomId, lib.encode(setNickMessage));
  }

  function handleKeyEvent(event: KeyboardEvent, keyEvType: KeyEventType) {
    if (["a", "w", "d", "s"].includes(event.key)) {
      const key = event.key.charCodeAt(0);
      const encodedKey = lib.encodeKey({ key: key, event: keyEvType});
      const time = Math.ceil(Date.now() / TICK_RATE) * TICK_RATE;
      const gameMsg: GameMessage = {
        tag: MessageType.COMMAND,
        user: thisPlayerId,
        time: time, 
        key: encodedKey
      };

      const encodedMessage = lib.encode(gameMsg);
      messageQueue.push(gameMsg);
      client.send(roomId, encodedMessage);
    }
  }

  const keyState: any = {};
  document.addEventListener('keydown', (event) => { 
    if (!keyState[event.code]) {
      keyState[event.code] = true;
      handleKeyEvent(event, KeyEventType.PRESS)
    }
  });
  document.addEventListener('keyup', (event) => { 
    if (keyState[event.code]) {
      keyState[event.code] = false;
      handleKeyEvent(event, KeyEventType.RELEASE)
    }
  });

  let lastUpdateTime = 0;
  let accumulatedTime = 0;

  function gameLoop(timestamp: number) {
    const deltaTime = timestamp - lastUpdateTime;
    lastUpdateTime = timestamp;
    accumulatedTime += deltaTime;

    while (gameState.tick < initTime && gameState.tickSet) {
      while (messageQueue.length > 0) {
        const message = messageQueue.shift()!;
        gameState = addMessageToQueue(gameState, message);
      }
      gameState = computeState(gameState);
    }

    while (messageQueue.length > 0) {
      const message = messageQueue.shift()!;
      gameState = addMessageToQueue(gameState, message);
    }

    while (accumulatedTime >= TICK_RATE) {
      gameState = computeState(gameState);  
      accumulatedTime -= TICK_RATE;
    }
    
    //addToStateHistory(gameState);
    draw(gameState);
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
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

  state.players.forEach(drawPlayer);

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Tick: ${state.tick}`, 10, 20);
}

function generateId(): number {
  const timestamp = new Date().getTime() & 0xFFFFFFFF;
  const randomPart = Math.floor(Math.random() * 0x10000);
  return (timestamp ^ randomPart) >>> 0;
}

function getPlayerColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

(window as any).enterRoom = enterRoom;



