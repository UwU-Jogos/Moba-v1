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

        // Use fixed-point arithmetic to ensure consistent results across clients
        const ratio = Math.floor((move_distance / distance_to_target) * 1000) / 1000;

        updated_projectile.pos.x = Math.floor((updated_projectile.pos.x + (updated_projectile.target.x - updated_projectile.pos.x) * ratio) * 100) / 100;
        updated_projectile.pos.y = Math.floor((updated_projectile.pos.y + (updated_projectile.target.y - updated_projectile.pos.y) * ratio) * 100) / 100;
        updated_projectile.remaining_distance = Math.floor((updated_projectile.remaining_distance - move_distance) * 100) / 100;

        if (move_distance >= distance_to_target) {
          updated_projectile.pos = { ...updated_projectile.target };
          updated_projectile.remaining_distance = 0;
        }
      }
      break;
  }

  return updated_projectile;
}
