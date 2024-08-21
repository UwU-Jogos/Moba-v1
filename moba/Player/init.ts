import { Player } from './_';

export function init(id: number, name: string): Player {
  const pos = { x: 100, y: 100 }; 

  const initial_player : Player = {
    id,
    name,
    pos,
    target_pos: pos,
    life: 200,
    key: {},
  };
  return initial_player;
}
