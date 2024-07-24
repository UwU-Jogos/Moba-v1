import UwUChat2Client from "./client";
import { List } from "immutable";

const COMMAND_MESSAGE = 0;
const SET_NICK = 1;

type GameMessage = 
  | { tag: 0, user: number, time: number, key: Uint8Array } 
  | { tag: 1, user: number, name: string } 

const enum KeyEventType {
  PRESS = 0,
  RELEASE = 1
}

type KeyEvent = {
  key: number,
  event: KeyEventType
}

function encodeKey(keyEv: KeyEvent): Uint8Array {
  if (keyEv.key > 127) {
    throw new Error("Invalid key code. Must be 7 bits or less.");
  }
  const mergedByte = (keyEv.key << 1) | keyEv.event;
  return new Uint8Array([mergedByte]);
}

function decodeKey(encodedKey: Uint8Array): KeyEvent {
  if (encodedKey.length !== 1) {
    throw new Error("Invalid encoded key length.");
  }
  
  const mergedByte = encodedKey[0];
  return {
    key: mergedByte >> 1,
    event: mergedByte & 1 as KeyEventType
  };
}

function encode(message: GameMessage): Uint8Array {
  const result = new Uint8Array(12);
  const view = new DataView(result.buffer);

  // Set tag
  result[0] = message.tag;

  // Set user (u32)
  view.setUint32(1, message.user, true);

  if (message.tag === 0) {
    // Set time (u48)
    view.setUint32(5, message.time & 0xFFFFFFFF, true);
    view.setUint16(9, (message.time >> 32) & 0xFFFF, true);

    // Set key (u8)
    result[11] = message.key[0];
  } else if (message.tag === 1) {
    // Set name (7 bytes)
    const encoder = new TextEncoder();
    const nameBytes = encoder.encode(message.name);
    const nameBytesToCopy = Math.min(nameBytes.length, 7);
    result.set(nameBytes.subarray(0, nameBytesToCopy), 5);

    // If name is shorter than 7 bytes, pad with zeros
    if (nameBytesToCopy < 7) {
      result.fill(0, 5 + nameBytesToCopy, 12);
    }
  }

  return result;
}

function decode(encoded: Uint8Array): GameMessage {
  if (encoded.length !== 12) {
    throw new Error("Invalid encoded message length. Expected 12 bytes.");
  }

  const view = new DataView(encoded.buffer);
  const tag = encoded[0];
  const user = view.getUint32(1, true);

  if (tag === 0) {
    const timeLow = view.getUint32(5, true);
    const timeHigh = view.getUint16(9, true);
    const time = (timeHigh << 32) | timeLow;
    const key = encoded.slice(11, 12);

    return {
      tag: 0,
      user,
      time: time, 
      key
    };
  } else if (tag === 1) {
    const nameBytes = encoded.slice(5, 12);
    const nullTerminatorIndex = nameBytes.indexOf(0);
    const nameLength = nullTerminatorIndex === -1 ? 7 : nullTerminatorIndex;
    const decoder = new TextDecoder();
    const name = decoder.decode(nameBytes.subarray(0, nameLength));

    return {
      tag: 1,
      user,
      name
    };
  } else {
    throw new Error("Invalid message tag");
  }
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
}

type StateHistory = List<GameState>;

// ----------- KeyBoard Events Handling ------------------
type KeyHandler = (roller: any, event: KeyboardEvent) => void;


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
}

function newPlayerList(updatedPlayer: Player, players: List<Player>): List<Player> {
  return players.map(player =>
    player.id === updatedPlayer.id ? updatedPlayer : player 
  );
}

function addPlayer(newPlayer: Player, players: List<Player>): List<Player> {
  return players.push(newPlayer);
}

function newGameState(players: List<Player>): GameState {
    return {
      players: players,
    }
}

function initialGameState(p: Player): GameState {
  return {
    players: List([p])
  }
}

function playerPressed(key: number, player: Player, pressed: boolean): Player {
  switch (key) {
    case (97 || 65):
      return { ...player, a: pressed };
    case (100 || 68):
      return { ...player, d: pressed };
    case (119 || 87):
      return { ...player, w: pressed };
    case (115 || 83):
      return { ...player, s: pressed };
    default:
      return player;
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




function computeState(state: GameState, gameMessage: GameMessage): GameState {
  const statePlayers = state.players;

  if (gameMessage == null) {
    return state;
  }

  switch (gameMessage.tag) {
    case COMMAND_MESSAGE:
      const decKey: KeyEvent = decodeKey(gameMessage.key);
      let player = getPlayerById(gameMessage.user, statePlayers);
      if(!player) {
        return state;
      }
      const pressed = decKey.event == 0 ? true : false;
      const playerPress = playerPressed(decKey.key, player, pressed);
      return newGameState(movePlayers(newPlayerList(playerPress, statePlayers)));
  
    //return newGameState(tick, addPlayer(event.player, statePlayers));

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

    const client = new UwUChat2Client();
    const testRoom = 1;
    let gameMessage: any = null;
    let state : GameState = initialGameState(activePlayer);
    console.log(state);

    client.init('ws://localhost:8080').then(() => {
        console.log('Connected to server');

        client.recv(testRoom, (msg: Uint8Array) => {
            gameMessage = decode(msg);
            console.log(gameMessage);
        });

        document.addEventListener('keypress', (event) => {
            if (["a", "w", "d", "s"].includes(event.key)) {
              const key = event.key.charCodeAt(0);
              const keyEvType = KeyEventType.PRESS;
              const encodedKey = encodeKey({key: key, event: keyEvType });
              const tag = COMMAND_MESSAGE;
              const user = thisPlayerId;
              const time = Date.now();

              const gameMsg: GameMessage = {
                tag: tag, user: user, time: time, key: encodedKey
              };

              state = computeState(state, gameMsg);
              draw(state);

              const encodedMessage = encode(gameMsg);
              client.send(testRoom, encodedMessage);
            }
        });

        document.addEventListener('keydown', (event) => {
          if (["a", "w", "d", "s"].includes(event.key)) {
              const key = event.key.charCodeAt(0);
              const keyEvType = KeyEventType.RELEASE;
              const encodedKey = encodeKey({key: key, event: keyEvType });
              const tag = COMMAND_MESSAGE;
              const user = thisPlayerId;
              const time = Date.now();

              const gameMsg: GameMessage = {
                tag: tag, user: user, time: time, key: encodedKey
              };

              state = computeState(state, gameMsg);
              draw(state);

              const encodedMessage = encode(gameMsg);
              client.send(testRoom, encodedMessage);
            }
        });

        function updateServerTime() {
            const serverTime = new Date(client.time());
            console.log(`Server Time: ${serverTime.toISOString()}`);

            if (gameMessage.user == thisPlayer()) {
              return;
            }
            state = computeState(state, gameMessage);
            draw(state);
            requestAnimationFrame(updateServerTime);
        }
        updateServerTime();

      }).catch(console.error);
 
    setThisPlayer(thisPlayerId); 
}

function generateHexId(): number {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 16777216); // 16777216 is 0xFFFFFF in decimal
  return Number(`${timestamp}${randomPart}`);
}

(window as any).enterRoom = enterRoom

