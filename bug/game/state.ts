export interface Player {
  name: string;
  pos: { x: number; y: number };
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

export interface GameState {
  players: { [key: string]: Player };
  tick: number;
}
