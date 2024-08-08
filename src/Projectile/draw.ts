import { circle } from "../Shape/circle";
import { GameState } from "../GameState/_";
import { PLAYER_RADIUS } from "../Helpers/consts";
import { draw as draw_shape } from '../Shape/draw';
import { square } from "../Shape/square";
import { triangle } from "../Shape/triangle";

export function draw(
  ctx: CanvasRenderingContext2D,
  gs: GameState
): void {
  gs.projectileSystem.forEach((projectile) => {
    switch (projectile.skillType) {
      case "melee":
        const player = gs.players.get(projectile.ownerId);
        if (player) {
          draw_shape(
            ctx,
            circle(player.pos, projectile.range),
            "rgba(255, 0, 0, 0.5)"
          );
        }
        break;
      case "target":
        draw_shape(
          ctx,
          square(
            {
              x: projectile.target.x - projectile.range / 2,
              y: projectile.target.y - projectile.range / 2,
            },
            projectile.range
          ),
          "rgba(0, 255, 0, 0.5)"
        );
        break;
      case "action":
        const angle = Math.atan2(
          projectile.target.y - projectile.pos.y,
          projectile.target.x - projectile.pos.x
        );
        const v1 = projectile.pos;
        const v2 = {
          x: projectile.pos.x + Math.cos(angle - 0.3) * PLAYER_RADIUS * 2,
          y: projectile.pos.y + Math.sin(angle - 0.3) * PLAYER_RADIUS * 2,
        };
        const v3 = {
          x: projectile.pos.x + Math.cos(angle + 0.3) * PLAYER_RADIUS * 2,
          y: projectile.pos.y + Math.sin(angle + 0.3) * PLAYER_RADIUS * 2,
        };
        draw_shape(ctx, triangle(v1, v2, v3), "rgba(0, 0, 255, 0.5)");
        break;
    }
  });
}