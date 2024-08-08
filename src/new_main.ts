import * as sm from "@uwu-games/uwu-state-machine";
import { UwUChat2Client } from "uwuchat2";
import { Map } from "immutable";
import { log } from "console";
// import { deserialize } from './Action/deserialize';
// import { serialize } from './Action/serialize';

// Types
// -----
export type Shape =
  | { type: "line"; ini: V2; end: V2 }
  | { type: "circle"; pos: V2; rad: number }
  | { type: "square"; pos: V2; side: number }
  | { type: "triangle"; v1: V2; v2: V2; v3: V2 };

export const PLAYER_SPEED = 5;
export const PLAYER_RADIUS = 10;
export const PLAYER_COLOR = `#${Math.floor(Math.random() * 16777215)
  .toString(16)
  .padStart(6, "0")}`;
export const ARTIFICIAL_DELAY = 100;
export type UID = number;
export type Key = string;
export type Name = string;
export type V2 = {
  x: number;
  y: number;
};

export type SkillType = "target" | "melee" | "action";

export type Skill = {
  id: string;
  type: SkillType;
  cooldown: number;
  duration: number;
  range: number;
};

export type Player = {
  id: UID;
  name: Name;
  pos: V2;
  target_pos: V2;
  skills: { [key: Key]: Skill };
  activeSkills: { [key: string]: number };
};

export type Projectile = {
  id: string;
  skillType: SkillType;
  ownerId: UID;
  pos_proj: V2;
  target: V2;
  speed: number;
  remainingDistance: number;
  remainingDuration: number;
  range: number;
};

// Atualize o GameState para incluir o projectileSystem
export type GameState = {
  tick: number;
  players: Map<UID, Player>;
  projectileSystem: Map<string, Projectile>;
};

// Update the init function
export function init(): GameState {
  return {
    tick: 0,
    players: Map<UID, Player>(),
    projectileSystem: Map<string, Projectile>(),
  };
}
export type Action =
  | { $: "SetNick"; time: number; pid: number; name: string }
  | {
    $: "SkillEvent";
    time: number;
    pid: number;
    key: string;
    down: boolean;
    x: number;
    y: number;
  }
  | { $: "MouseClick"; time: number; pid: number; x: number; y: number };

export function match<R>(
  action: Action,
  handlers: {
    SetNick: (time: number, pid: number, name: string) => R;
    SkillEvent: (
      time: number,
      pid: number,
      key: string,
      down: boolean,
      x: number,
      y: number
    ) => R;
    MouseClick: (time: number, pid: number, x: number, y: number) => R;
  }
): R {
  switch (action.$) {
    case "SetNick":
      return handlers.SetNick(action.time, action.pid, action.name);
    case "SkillEvent":
      return handlers.SkillEvent(
        action.time,
        action.pid,
        action.key,
        action.down,
        action.x,
        action.y
      );
    case "MouseClick":
      return handlers.MouseClick(action.time, action.pid, action.x, action.y);
    default:
      throw new Error("Unknown action type");
  }
}

export function deserialize(data: Uint8Array): Action {
  const decoder = new TextDecoder();
  switch (data[0]) {
    case 0: {
      // SetNick
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const name = decoder.decode(data.slice(13));
      return { $: "SetNick", time, pid, name };
    }
    case 1: {
      // SkillEvent
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const key = String.fromCharCode(data[13]);
      const down = data[14] === 1;
      const x = (data[15] << 8) | data[16];
      const y = (data[17] << 8) | data[18];
      return { $: "SkillEvent", time, pid, key, down, x, y };
    }
    case 2: {
      // MouseClick
      const tick_buffer = new Uint8Array(8);
      tick_buffer.set(data.slice(1, 7), 0);
      const time = Number(new BigUint64Array(tick_buffer.buffer)[0]);
      const pid_buffer = new Uint8Array(8);
      pid_buffer.set(data.slice(7, 13), 0);
      const pid = Number(new BigUint64Array(pid_buffer.buffer)[0]);
      const x = (data[13] << 8) | data[14];
      const y = (data[15] << 8) | data[16];
      return { $: "MouseClick", time, pid, x, y };
    }
    default: {
      throw new Error("Unknown action type");
    }
  }
}

export function serialize(action: Action): Uint8Array {
  const encoder = new TextEncoder();

  return match(action, {
    SetNick: (time: number, pid: number, name: string) => {
      let buffer: number[] = [];
      buffer.push(0); // Action type identifier for SetNick
      buffer.push(
        ...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)
      ); // 48-bit Time
      buffer.push(
        ...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)
      ); // 48-bit UID
      buffer.push(...encoder.encode(name));
      return new Uint8Array(buffer);
    },

    SkillEvent: (
      time: number,
      pid: number,
      key: string,
      down: boolean,
      x: number,
      y: number
    ) => {
      let buffer: number[] = [];
      buffer.push(1); // Action type identifier for SkillEvent
      buffer.push(
        ...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)
      ); // 48-bit Time
      buffer.push(
        ...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)
      ); // 48-bit UID
      buffer.push(key.charCodeAt(0)); // 8-bit Key
      buffer.push(down ? 1 : 0); // Boolean as 1 or 0
      // x and y are represented using 2 bytes each
      buffer.push((x >> 8) & 0xff); // High byte
      buffer.push(x & 0xff); // Low byte
      buffer.push((y >> 8) & 0xff); // High byte
      buffer.push(y & 0xff); // Low byte
      return new Uint8Array(buffer);
    },

    MouseClick: (time: number, pid: number, x: number, y: number) => {
      let buffer: number[] = [];
      buffer.push(2); // Action type identifier for MouseClick
      buffer.push(
        ...new Uint8Array(new BigUint64Array([BigInt(time)]).buffer).slice(0, 6)
      ); // 48-bit Time
      buffer.push(
        ...new Uint8Array(new BigUint64Array([BigInt(pid)]).buffer).slice(0, 6)
      ); // 48-bit UID
      buffer.push((x >> 8) & 0xff); // High byte
      buffer.push(x & 0xff); // Low byte
      buffer.push((y >> 8) & 0xff); // High byte
      buffer.push(y & 0xff); // Low byte
      return new Uint8Array(buffer);
    },
  });
}

const TPS = 32;
const PID = Math.floor(Math.random() * 2 ** 16);
const PRADIUS = 10;
console.log("PID is:", PID);

// Main App
// --------

// Starts State Machine
var room: UID = 418110;
var mach: sm.Mach<GameState, Action> = sm.new_mach(TPS);

// Connects to Server
const client = new UwUChat2Client();

await client.init("ws://localhost:7171");
// await client.init('ws://server.uwu.games');

// Joins Room & Handles Messages
const leave = client.recv(room, (msg) => {
  try {
    sm.register_action(mach, deserialize(msg));
  } catch (e) { }
});

// Input Handler
const key_state: { [key: string]: boolean } = {};
function handle_skill_event(event: KeyboardEvent) {
  const key = event.key.toUpperCase();
  if (["Q", "W", "E", "R"].includes(key)) {
    const down = event.type === "keydown";
    if (key_state[key] !== down) {
      key_state[key] = down;
      var time = client.time();
      var act = {
        $: "SkillEvent",
        time,
        pid: PID,
        key,
        down,
        x: mouseX,
        y: mouseY,
      } as Action;
      sm.register_action(mach, act);
      client.send(room, serialize(act));
    }
  }
}
// Mouse Click Handler
function handle_mouse_click(event: MouseEvent) {
  if (event.button === 0 && event.target instanceof HTMLCanvasElement) {
    const time = client.time() + ARTIFICIAL_DELAY;
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;

    const act = { $: "MouseClick", time, pid: PID, x, y } as Action;

    // Add to own action log
    sm.register_action(mach, act);
    // Send to server
    client.send(room, serialize(act));
  }
}

window.addEventListener("keydown", handle_skill_event);
window.addEventListener("keyup", handle_skill_event);
window.addEventListener("mousemove", handle_mouse_move);
window.addEventListener("click", handle_mouse_click);
// Add mouse position tracking
let mouseX = 0;
let mouseY = 0;

function handle_mouse_move(event: MouseEvent) {
  if (event.target instanceof HTMLCanvasElement) {
    mouseX = event.clientX - event.target.offsetLeft;
    mouseY = event.clientY - event.target.offsetTop;
  }
}
export function get_canvas_dimensions(): { width: number; height: number } {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  return { width: canvas.width, height: canvas.height };
}

export function circle(pos: V2, rad: number): Shape {
  return {
    type: "circle",
    pos: pos,
    rad: rad,
  };
}
export function line(ini: V2, end: V2): Shape {
  return {
    type: "line",
    ini: ini,
    end: end,
  };
}

export function shapematch<T>(
  shape: Shape,
  handlers: {
    line: (ini: V2, end: V2) => T;
    circle: (pos: V2, rad: number) => T;
    square: (pos: V2, side: number) => T;
    triangle: (v1: V2, v2: V2, v3: V2) => T;
  }
): T {
  switch (shape.type) {
    case "line":
      return handlers.line(shape.ini, shape.end);
    case "circle":
      return handlers.circle(shape.pos, shape.rad);
    case "square":
      return handlers.square(shape.pos, shape.side);
    case "triangle":
      return handlers.triangle(shape.v1, shape.v2, shape.v3);
  }
}

export function square(pos: V2, side: number): Shape {
  return {
    type: "square",
    pos: pos,
    side: side,
  };
}

export function triangle(v1: V2, v2: V2, v3: V2): Shape {
  return {
    type: "triangle",
    v1,
    v2,
    v3,
  };
}
export function draw_shape(
  canvas: CanvasRenderingContext2D,
  shape: Shape,
  color: string
): void {
  canvas.fillStyle = color;
  shapematch(shape, {
    line: (ini: V2, end: V2) => {
      canvas.beginPath();
      canvas.moveTo(ini.x, ini.y);
      canvas.lineTo(end.x, end.y);
      canvas.stroke();
    },
    circle: (pos: V2, rad: number) => {
      canvas.beginPath();
      canvas.arc(pos.x, pos.y, rad, 0, 2 * Math.PI);
      canvas.fill();
    },
    square: (pos: V2, side: number) => {
      canvas.fillRect(pos.x, pos.y, side, side);
    },
    triangle: (v1: V2, v2: V2, v3: V2) => {
      canvas.beginPath();
      canvas.moveTo(v1.x, v1.y);
      canvas.lineTo(v2.x, v2.y);
      canvas.lineTo(v3.x, v3.y);
      canvas.closePath();
      canvas.fill();
    },
  });
}
function distance(p1: V2, p2: V2): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
// Update the createProjectile function to return a tuple of [id, Projectile]
function createProjectile(
  skill: Skill,
  ownerId: UID,
  pos: V2,
  target: V2
): [string, Projectile] {
  const id = `${skill.id}-${ownerId}-${Date.now()}`;
  return [id, {
    id,
    skillType: skill.type,
    ownerId,
    pos_proj: pos,
    target,
    remainingDistance: skill.range,
    remainingDuration: skill.duration,
    speed: skill.range / skill.duration,
    range: skill.range,
  }];
}

// Função activateSkill (como definida anteriormente)
function ticksToSeconds(ticks: number): number {
  return ticks / TPS;
}

// Função auxiliar para converter segundos para ticks
function secondsToTicks(seconds: number): number {
  return Math.round(seconds * TPS);
}

// Update the activateSkill function
function activateSkill(
  gs: GameState,
  playerId: UID,
  skillKey: Key,
  targetPos: V2
): GameState {
  const player = gs.players.get(playerId);
  if (!player) return gs;

  const skill = player.skills[skillKey];
  if (!skill) return gs;

  const currentTick = gs.tick;
  if (
    player.activeSkills[skill.id] &&
    currentTick < player.activeSkills[skill.id]
  ) {
    return gs; // Skill is still on cooldown
  }

  // Activate the skill
  const [projectileId, newProjectile] = createProjectile(
    skill,
    playerId,
    player.pos,
    targetPos
  );
  const newProjectileSystem = Map(gs.projectileSystem).set(projectileId, newProjectile);

  // Update the skill cooldown
  const newActiveSkills = {
    ...player.activeSkills,
    [skill.id]: currentTick + skill.cooldown,
  };

  const newPlayers = gs.players.set(playerId, {
    ...player,
    activeSkills: newActiveSkills,
  });

  return {
    ...gs,
    players: newPlayers,
    projectileSystem: newProjectileSystem,
  };
}
// Don't forget to add the event listener for mouse move
export function when(when: Action, gs: GameState): GameState {
  let players = gs.players;

  if (!players.has(when.pid)) {
    players = players.set(when.pid, {
      id: when.pid,
      name: "Anon",
      pos: { x: 256, y: 128 },
      target_pos: { x: 256, y: 128 },
      skills: {
        Q: {
          id: "skill1",
          type: "melee",
          cooldown: secondsToTicks(0.5),
          duration: secondsToTicks(0.5),
          range: PLAYER_RADIUS * 2,
        },
        W: {
          id: "skill2",
          type: "target",
          cooldown: secondsToTicks(0.5),
          duration: secondsToTicks(0.5),
          range: PLAYER_RADIUS * 2,
        },
        E: {
          id: "skill3",
          type: "action",
          cooldown: secondsToTicks(0.5),
          duration: secondsToTicks(0.1),
          range: 200,
        },
      },
      activeSkills: {},
    });
  }

  switch (when.$) {
    case "SetNick": {
      players = players.update(
        when.pid,
        (player) => ({ ...player, name: when.name } as Player)
      );
      break;
    }

    case "SkillEvent": {
      if (when.down) {
        gs = activateSkill(gs, when.pid, when.key, { x: when.x, y: when.y });
      }
      break;
    }
    case "MouseClick": {
      players = players.update(when.pid, (player) => {
        if (!player) return player;
        return { ...player, target_pos: { x: when.x, y: when.y } } as Player;
      });
      break;
    }
  }
  return { ...gs, players };
}

// Update the tick function
export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolationFactor = 0.1;
  let players = gs.players;
  let projectileSystem = Map(gs.projectileSystem);

  // Update projectiles
  projectileSystem.forEach((projectile, id) => {
    projectile.remainingDuration -= dt;

    let shouldKeepProjectile = true;

    switch (projectile.skillType) {
      case "melee":
        // Melee skill follows the player
        const player = players.get(projectile.ownerId);
        if (player) {
          projectile.pos_proj = { ...player.pos };
        }
        break;
      case "target":
        // Target skill remains at the activated position
        projectile.pos_proj = { ...projectile.target };
        break;
      case "action":
        const distanceToTarget = distance(
          projectile.pos_proj,
          projectile.target
        );

        if (distanceToTarget > 0 && projectile.remainingDistance > 0) {
          const moveDistanceToTarget = Math.min(
            distanceToTarget,
            projectile.speed * dt,
            projectile.remainingDistance
          );
          const ratio = moveDistanceToTarget / distanceToTarget;

          projectile.pos_proj.x +=
            (projectile.target.x - projectile.pos_proj.x) * ratio;
          projectile.pos_proj.y +=
            (projectile.target.y - projectile.pos_proj.y) * ratio;
          projectile.remainingDistance -= moveDistanceToTarget;

          // If the projectile reached the target, stop it
          if (moveDistanceToTarget >= distanceToTarget) {
            projectile.pos_proj = { ...projectile.target };
            projectile.remainingDistance = 0;
          }
        }
        break;
    }

    // Check for collisions with players
    players.forEach((player, playerId) => {
      if (playerId !== projectile.ownerId) {
        const dist = distance(projectile.pos_proj, player.pos);
        if (dist < PLAYER_RADIUS) {
          console.log(
            `Player ${playerId} hit by ${projectile.skillType} skill from ${projectile.ownerId}`
          );
          // Apply skill effect here
          shouldKeepProjectile = false;  // Remove projectile after hit
        }
      }
    });

    // Remove projectiles that have reached their target, end of range, or duration
    if (
      projectile.remainingDuration <= 0 ||
      (projectile.skillType === "action" && projectile.remainingDistance <= 0) ||
      !shouldKeepProjectile
    ) 
    {
      projectileSystem.delete(id);
      // Do not add this projectile to the updated Map
    }

  });

  players = players
    .map((player, uid) => {
      if (!player) return player;

      // Movement logic (remains the same)
      const dx = player.target_pos.x - player.pos.x;
      const dy = player.target_pos.y - player.pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let newX = player.pos.x;
      let newY = player.pos.y;

      if (distance > 0) {
        const moveDistance = Math.min(distance, PLAYER_SPEED * dt * 128);
        const ratio = moveDistance / distance;

        newX = player.pos.x + dx * ratio * interpolationFactor;
        newY = player.pos.y + dy * ratio * interpolationFactor;

        // Collision check with other players (remains the same)
        gs.players.forEach((otherPlayer, otherUid) => {
          if (uid !== otherUid) {
            const dx = newX - otherPlayer.pos.x;
            const dy = newY - otherPlayer.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < PLAYER_RADIUS * 2) {
              const angle = Math.atan2(dy, dx);
              newX = otherPlayer.pos.x + Math.cos(angle) * PLAYER_RADIUS * 2;
              newY = otherPlayer.pos.y + Math.sin(angle) * PLAYER_RADIUS * 2;
            }
          }
        });

        // Clamp to canvas boundaries (remains the same)
        newX = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, newX));
        newY = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, newY));
      }

      // // Skill logic
      const activeSkills = { ...player.activeSkills };
      Object.entries(activeSkills).forEach(([skillId, endTick]) => {
        if (gs.tick >= endTick) {
          delete activeSkills[skillId];
        } else {
          const skill = Object.values(player.skills).find(
            (s) => s.id === skillId
          );
          if (skill) {
            switch (skill.type) {
              case "melee":
                // Apply melee effect (e.g., damage nearby players)
                // Apply melee effect (e.g., damage)
                console.log(`Player ${uid} hit with melee skill`);
                break;
              case "target":
                // Apply target effect (e.g., heal or buff self)
                console.log(`Player ${uid} used target skill on self`);
                break;
              case "action":
                // Move projectile or apply continuous effect
                // This is a simplified example; you might want to add projectile logic
                console.log(`Player ${uid} is using action skill`);
                break;
            }
          }
        }
      });

      return {
        ...player,
        pos: { x: newX, y: newY },
        activeSkills,
      };
    })
    .toMap();

  return {
    ...gs,
    tick: gs.tick + 1,
    players: players as Map<UID, Player>,
    projectileSystem: projectileSystem,
  };
}

export function draw(gs: GameState): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  gs.players.forEach((player) => {
    draw_shape(ctx, circle(player.pos, PLAYER_RADIUS), PLAYER_COLOR);

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(player.name, player.pos.x, player.pos.y - 20);
  });
  // Desenhar projéteis
  draw_projectiles(ctx, gs);
}
// Update the draw_projectiles function
export function draw_projectiles(
  ctx: CanvasRenderingContext2D,
  gs: GameState
): void {
  gs.projectileSystem.forEach((projectile) => {
    switch (projectile.skillType) {
      case "melee":
        const player = gs.players.get(projectile.ownerId);
        if (player) {
          draw_shape(
            ctx,
            circle(player.pos, projectile.range),
            "rgba(255, 0, 0, 0.5)"
          );
        }
        break;
      case "target":
        draw_shape(
          ctx,
          square(
            {
              x: projectile.target.x - projectile.range / 2,
              y: projectile.target.y - projectile.range / 2,
            },
            projectile.range
          ),
          "rgba(0, 255, 0, 0.5)"
        );
        break;
      case "action":
        const angle = Math.atan2(
          projectile.target.y - projectile.pos_proj.y,
          projectile.target.x - projectile.pos_proj.x
        );
        const v1 = projectile.pos_proj;
        const v2 = {
          x: projectile.pos_proj.x + Math.cos(angle - 0.3) * PLAYER_RADIUS * 2,
          y: projectile.pos_proj.y + Math.sin(angle - 0.3) * PLAYER_RADIUS * 2,
        };
        const v3 = {
          x: projectile.pos_proj.x + Math.cos(angle + 0.3) * PLAYER_RADIUS * 2,
          y: projectile.pos_proj.y + Math.sin(angle + 0.3) * PLAYER_RADIUS * 2,
        };
        draw_shape(ctx, triangle(v1, v2, v3), "rgba(0, 0, 255, 0.5)");
        break;
    }
  });
}
// Game Loop
function game_loop() {
  // Compute the current state
  const state = sm.compute(mach, { init, tick, when }, client.time());

  // Draw the current state
  draw(state);

  // Schedule the next frame
  requestAnimationFrame(game_loop);
}

game_loop();
