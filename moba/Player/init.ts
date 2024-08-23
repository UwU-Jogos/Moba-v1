
import { Player } from './_';
import { ball } from '../Hero/ball';

export function init(id: number, name: string): Player {
  const initial_player: Player = {
    id,
    name,
    key: {},
    hero: ball("ball", id, { x: 100, y: 100 })
  };
  return initial_player;
}
