import { Player } from './_';
import { Body } from '../Body/_';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';
import { Shape } from '../../base/Shape/_';
import { circle } from '../../base/Shape/circle';
import { draw as draw_shape } from '../../base/Shape/draw';
import { move } from '../Effect/move';
import { move as move_shape } from '../../base/Shape/move';

export function init(id: number, name: string): Player {
  const hero : Hero = init_hero();

  const initial_player: Player = {
    id,
    name,
    key: {},
    hero
  };
  return initial_player;
}
