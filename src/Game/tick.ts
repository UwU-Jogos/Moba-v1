/// Updates the game state for a single tick.
///
/// # Input
///
/// * `state` - The current game state
///
/// # Output
///
/// Returns the updated GameState after processing a single tick

import { GameState } from '../GameState/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { TPS } from '../Helpers/consts';
import { update_projectiles } from '../Projectile/update_projectiles';
import { update_players } from '../Player/update_players';
import { create_timed_line_walls } from '../GameMap/create_timed_line_walls';

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();

  let updated_gs = update_projectiles(gs, dt);
  updated_gs = update_players(updated_gs, dt);

  if (updated_gs.tick % (5 * TPS) === 0) {
    const new_timed_line_walls = create_timed_line_walls(updated_gs.tick, width, height);
    updated_gs.game_map.objects.push(...new_timed_line_walls);
  }

  updated_gs.game_map.objects = updated_gs.game_map.objects.filter(obj =>
    obj.kind !== 'TimedLineWall' || (obj.kind === 'TimedLineWall' && obj.active > 0)
  );

  return {
    ...updated_gs,
    tick: updated_gs.tick + 1,
  };
}
