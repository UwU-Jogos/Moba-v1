import { Skill } from './_';
import { move as move_effect } from '../Effect/move';
import { V2 } from '../../base/V2/_';
import { scale } from '../../base/V2/scale';
import { PLAYER_SPEED } from '../Helpers/consts';
import { seconds_to_ticks } from '../Helpers/seconds_to_ticks';

// Defines a 'move' skill that moves a body in a given direction
// - direction: the direction to move in
// = a Skill that applies a move effect
export function move(direction: V2): Skill {
  return {
    id: "move",
    effects: [
      (gs, body) => {
        const movement = scale(direction, PLAYER_SPEED / seconds_to_ticks(1));
        return move_effect(body, movement);
      }
    ]
  };
}
