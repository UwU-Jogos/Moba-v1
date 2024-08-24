import { Skill } from './_';
import { V2 } from '../../base/V2/_';
import { normalize } from '../../base/V2/normalize';
import { scale } from '../../base/V2/scale';
import { move } from '../Effect/move';

// Creates a move skill for a body
// - body_id: the ID of the Body to move
// - direction: the direction vector of the movement
// - speed: the speed of the movement
// = a Skill that moves the body in the specified direction and speed
export function move_skill(body_id: string, direction: V2, speed: number): Skill {
  const movement = scale(normalize(direction), speed);
  return {
    name: "Move",
    effects: [move(body_id, movement)]
  };
}
