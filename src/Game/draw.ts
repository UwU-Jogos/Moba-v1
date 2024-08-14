/// Draws the current game state on the screen.
///
/// # Input
///
/// * `state` - The current game state to be drawn
///
/// # Output
///
/// This function doesn't return a value, it performs the drawing operation.

import { GameState } from '../GameState/_';
import { draw as draw_game_object } from '../GameMap/GameObject/draw';
import { draw as draw_projectiles } from '../Projectile/draw';
import { draw as draw_player } from '../Player/draw';

export function draw(gs: GameState): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear the canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  gs.game_map.objects.forEach(game_object => {
    draw_game_object(ctx, game_object);
  });

  gs.players.forEach(player => {
    draw_player(ctx, player);
  });
  draw_projectiles(ctx, gs);
}
