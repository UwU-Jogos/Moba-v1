import { circle } from "../Shape/circle";
import { GameState } from "../GameState/_";
import { PLAYER_RADIUS } from "../Helpers/consts";
import { draw as draw_shape } from '../Shape/draw';
import { square } from "../Shape/square";
import { rectangle } from "../Shape/rectangle";

export function draw(ctx: CanvasRenderingContext2D, gs: GameState): void {
  gs.projectile_system.forEach((projectile) => {
    switch (projectile.skill_type) {
      case "melee":
        const player = gs.players.get(projectile.owner_id);
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
        const rectWidth = 4;
        const rectHeight = PLAYER_RADIUS / 2;
        const rectPos = {
          x: projectile.pos.x - (rectWidth / 2) * Math.cos(angle),
          y: projectile.pos.y - (rectWidth / 2) * Math.sin(angle)
        };
        draw_shape(
          ctx,
          rectangle(rectPos, rectWidth, rectHeight),
          "rgba(0, 0, 255, 0.5)"
        );
        break;
    }
  });
}
