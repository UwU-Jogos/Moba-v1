import { Hero } from './_';
import { circle } from '../../base/Shape/circle';
import { move_skill } from '../Skill/move';
import { GameState } from '../GameState/_';
import { V2 } from '../../base/V2/_';

// Creates a ball hero
// - name: the name of the hero
// - owner_id: the ID of the player who owns this hero
// - pos: the initial position of the hero
// = a new Hero instance representing a ball
export function ball(name: string, owner_id: number, pos: V2): Hero {
  const body_id = `ball_${owner_id}`;
  const speed = 5;
  const radius = 10;

  const hero: Hero = {
    name,
    skills: {
      'W': move_skill(body_id, { x: 0, y: -1 }, speed),
      'A': move_skill(body_id, { x: -1, y: 0 }, speed),
      'S': move_skill(body_id, { x: 0, y: 1 }, speed),
      'D': move_skill(body_id, { x: 1, y: 0 }, speed),
    },
    body: {
      id: body_id,
      hitbox: circle(pos, radius),
      pos,
      tick: (gs: GameState): GameState => {
        const player = gs.players.get(owner_id);
        if (!player) return gs;

        let updated_gs = gs;
        Object.entries(player.key).forEach(([key, is_pressed]) => {
          if (is_pressed && hero.skills[key]) {
            hero.skills[key].effects.forEach(effect => {
              [updated_gs] = effect(updated_gs);
            });
          }
        });

        return updated_gs;
      }
    },
    owner_id
  };

  return hero;
}
