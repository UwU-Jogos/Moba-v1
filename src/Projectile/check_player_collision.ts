
import { distance } from '../Helpers/distance';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { Player } from '../Player/_';
import { take_damage } from '../Player/take_damage';
import { UID } from '../UID/_';
import { Projectile } from './_';

export function check_player_collision(projectile: Projectile, player: Player, player_id: UID): Player {
 if (player_id !== projectile.owner_id) {
    const dist_enemy = projectile.skill_type === 'melee' ? projectile.range * 1.5 : PLAYER_RADIUS * 2;
    const dist = parseInt(distance(projectile.pos, player.pos).toFixed(2));
    if (dist < dist_enemy) {
      //return take_damage(player, projectile.damage);
      console.log("Someone was hit!");
      return player;
    } else {
      return player;
    }
  } else {
    return player;
  }
}
