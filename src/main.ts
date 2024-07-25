import UwUChat2Client from "./client";
import lib from "./lib";
import { List } from "immutable";

const COMMAND_MESSAGE = 0
const SET_NICK = 1
const TICK_MESSAGE = 2

type GameMessage = 
  | { tag: 0, user: number, time: number, key: Uint8Array } 
  | { tag: 1, user: number, name: string } 
  | { tag: 2 }

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
  console.log('Key pressed:', key);
  switch (key) {
    case (97):
      console.log("Player moving to left");
      return { ...player, a: pressed };
    case (100):
      console.log("Player moving to right");
      return { ...player, d: pressed };
    case (119):
      console.log("Player moving to up");
      return { ...player, w: pressed };
    case (115):
      console.log("Player moving to down");
      return { ...player, s: pressed };
    default:
      return player;
  }
}

function movePlayers(players: List<Player>): List<Player> {
  const canvasX = 1;
  const canvasY = 1;
  const canvasWidth = 400;
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
      const decKey: KeyEvent = lib.decodeKey(gameMessage.key);
      console.log('Decoded key:', decKey);
      // if its null event, a player joined
      if (decKey.key == 0) {
        if (gameMessage.user == thisPlayer()) {
          return state;
        }
        const player: Player = newPlayer(gameMessage.user, "test");
        return newGameState(addPlayer(player, statePlayers));
      }

      let player = getPlayerById(gameMessage.user, statePlayers);
      if(!player) {
        return state;
      }
      const pressed = decKey.event == 1 ? true : false;
      const playerPress = playerPressed(decKey.key, player, pressed);
      console.log('Player after press:', playerPress); 
      return newGameState(newPlayerList(playerPress, statePlayers));
  
    case TICK_MESSAGE:
      return newGameState(movePlayers(statePlayers));

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
    let thisPlayerId = generateId();
    const activePlayer = newPlayer(thisPlayerId, nickname);
    setThisPlayer(thisPlayerId); 

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
    let pendingMessages: GameMessage[] = [];


    client.init('ws://server.uwu.games').then(() => {
      console.log('Connected to server');

      function sendPlayerJoinedEvent() {
          // key = 0, which is the ascii code to null key
          const key = 0;
          const encodedKey = lib.encodeKey({ key: key, event: KeyEventType.PRESS });
          const user = thisPlayer();
          const time = Date.now();
          const joinedMsg: GameMessage = {
            tag: COMMAND_MESSAGE,
            user: user,
            time: time,
            key: encodedKey
          };
          const encodedMessage = lib.encode(joinedMsg);
          client.send(testRoom, encodedMessage);
          // console.log("SENT PLAYER JOINED EVENT");
        }

        sendPlayerJoinedEvent();

        client.recv(testRoom, (msg: Uint8Array) => {
            const decodedMessage = lib.decode(msg);
            // console.log("RECEIVED MESSAGE");
            // console.log(decodedMessage);
            if (decodedMessage.user !== thisPlayerId) {
                pendingMessages.push(decodedMessage);
            }
            // console.log("PENDING MESSAGES: ");
            // console.log(pendingMessages);
        });

        function handleKeyEvent(event: KeyboardEvent, keyEvType: KeyEventType) {
            if (["a", "w", "d", "s"].includes(event.key)) {
                const key = event.key.charCodeAt(0);
                console.log('Key code:', key);
                const encodedKey = lib.encodeKey({key: key, event: keyEvType});
                console.log('Encoded key:', encodedKey);
                const gameMsg: GameMessage = {
                    tag: COMMAND_MESSAGE,
                    user: thisPlayerId,
                    time: Date.now(),
                    key: encodedKey
                };

                pendingMessages.push(gameMsg);
                const encodedMessage = lib.encode(gameMsg);
                client.send(testRoom, encodedMessage);
            }
        }
        document.addEventListener('keydown', (event) => handleKeyEvent(event, KeyEventType.PRESS));
        document.addEventListener('keyup', (event) => handleKeyEvent(event, KeyEventType.RELEASE));

        function gameLoop() {
            const serverTime = new Date(client.time());

            while (pendingMessages.length > 0) {
              // console.log("IM here processing pending messages!");
              const message = pendingMessages.shift();
              // console.log(message);
              if (message) {
                // console.log("PROCESSING NEW MESSAGE");
                state = computeState(state, message);
                state = computeState(state, { tag: TICK_MESSAGE });
                // console.log("new state: ");
                // console.log(state);
              }
            }
            state = computeState(state, { tag: TICK_MESSAGE });
            draw(state);

            requestAnimationFrame(gameLoop);
        }
        gameLoop();

      }).catch(console.error); 
}

function generateId(): number {
  const timestamp = new Date().getTime() & 0xFFFFFFFF;
  const randomPart = Math.floor(Math.random() * 0x10000);
  return (timestamp ^ randomPart) >>> 0;
}


(window as any).enterRoom = enterRoom

