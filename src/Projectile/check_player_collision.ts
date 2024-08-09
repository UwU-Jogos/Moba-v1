import { distance } from '../Helpers/distance';
import { PLAYER_RADIUS } from '../Helpers/consts';
import { Player } from '../Player/_';
import { take_damage } from '../Player/take_damage';
import { UID } from '../UID/_';
import { Projectile } from './_';

export function check_player_collision(projectile: Projectile, player: Player, player_id: UID): [Player, Projectile] {
  if (projectile.owner_id === player_id) {
    return [player, projectile];
  }

  const dist = distance(projectile.pos, player.pos);
  if (dist <= PLAYER_RADIUS) {
    const damaged_player = take_damage(player, projectile.damage);
    const useless_projectile: Projectile = {
      ...projectile,
      remaining_distance: 0,
      remaining_duration: 0,
      speed: 0,
      damage: 0
    };
    return [damaged_player, useless_projectile];
  }

  return [player, projectile];
}
