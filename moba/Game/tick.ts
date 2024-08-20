import { GameState } from '../GameState/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { TPS } from '../Helpers/consts';
import { update as update_players } from '../Player/update';
import { create_timed_line_walls } from '../GameMap/create_timed_line_walls';
import { update as update_skill } from '../Skill/update';

// Updates the game state for a single tick.
// - gs: The current game state
// = The updated GameState after processing a single tick
export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();

  const updated_skill_gs = update_skill(gs);
  const updated_players_gs = update_players(updated_skill_gs, dt);

  const new_timed_line_walls = should_create_walls(updated_players_gs.tick)
    ? create_timed_line_walls(updated_players_gs.tick, width, height)
    : [];

  const filtered_objects = filter_active_objects(updated_players_gs.game_map.objects);
  const updated_objects = [...filtered_objects, ...new_timed_line_walls];

  return {
    ...updated_players_gs,
    tick: updated_players_gs.tick + 1,
    game_map: {
      ...updated_players_gs.game_map,
      objects: updated_objects,
    },
  };
}

// Determines if new walls should be created based on the current tick
// - tick: The current game tick
// = Whether new walls should be created
function should_create_walls(tick: number): boolean {
  return tick % (5 * TPS) === 0;
}

// Filters out inactive TimedLineWall objects
// - objects: The list of game objects to filter
// = A new list containing only active objects
function filter_active_objects(objects: GameState['game_map']['objects']): GameState['game_map']['objects'] {
  return objects.filter(obj =>
    obj.kind !== 'TimedLineWall' || (obj.kind === 'TimedLineWall' && obj.active > 0)
  );
}

