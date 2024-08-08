
import { Projectile } from './_';
import { Player } from '../Player/_';
import { distance } from '../Helpers/distance';

export function move(projectile: Projectile, owner_player: Player | undefined, dt: number): Projectile {
  let updated_projectile = { ...projectile }; 

  switch (updated_projectile.skill_type) {
    case "melee":
      if (owner_player) {
        updated_projectile.pos = { ...owner_player.pos };
      }
      break;

    case "target":
      updated_projectile.pos = { ...updated_projectile.target };
      break;

    case "action":
      const distance_to_target = distance(updated_projectile.pos, updated_projectile.target);
      if (distance_to_target > 0 && updated_projectile.remaining_distance > 0) {
        const move_distance = Math.min(
          distance_to_target,
          updated_projectile.speed * dt,
          updated_projectile.remaining_distance
        );
        const ratio = move_distance / distance_to_target;

        updated_projectile.pos.x += (updated_projectile.target.x - updated_projectile.pos.x) * ratio;
        updated_projectile.pos.y += (updated_projectile.target.y - updated_projectile.pos.y) * ratio;
        updated_projectile.remaining_distance -= move_distance;

        if (move_distance >= distance_to_target) {
          updated_projectile.pos = { ...updated_projectile.target };
          updated_projectile.remaining_distance = 0;
        }
      }
      break;
  }

  return updated_projectile;
}
