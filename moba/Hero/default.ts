import { Hero } from './_';
import { Body } from '../Body/_';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';
import { Shape } from '../../base/Shape/_';
import { circle } from '../../base/Shape/circle';
import { draw as draw_shape } from '../../base/Shape/draw';
import { move } from '../Effect/move';
import { move as move_shape } from '../../base/Shape/move';

import { move as move_skill } from '../Skill/move';
import { Skill } from '../Skill/_';

export function default_hero(): Hero {
  const move_up: Skill = move_skill({ x: 0, y: -1 });
  const move_down: Skill = move_skill({ x: 0, y: 1 });
  const move_left: Skill = move_skill({ x: -1, y: 0 });
  const move_right: Skill = move_skill({ x: 1, y: 0 });

  const skills: { [key: string]: Skill } = {
    'W': move_up,
    'S': move_down,
    'A': move_left,
    'D': move_right
  };

  const pos: V2 = { x: 100, y: 100 };
  const hitbox = circle(pos, 10);
  const body_id = `default-hero-${Date.now()}`;

  const body: Body = {
    id: body_id,
    hitbox: hitbox,
    pos: pos,
    tick: (gs: GameState) => gs,
    draw: (ctx: CanvasRenderingContext2D) => {
      draw_shape(ctx, hitbox);
    },
  };

  return {
    id: "default",
    skills: skills,
    body: body
  };
}
