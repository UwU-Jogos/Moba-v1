/// Matches an Action with corresponding handlers.
///
/// # Input
///
/// * `action` - The Action to match against
/// * `handlers` - An object containing handler functions for each Action type
///
/// # Output
///
/// The result of calling the appropriate handler function

import { GameObject } from './_';
import { V2 } from '../../V2/_';
import { Effect } from '../../Types/Effect/_';

export function match<R>(
  game_obj: GameObject,
  handlers: {
    Wall: (position: V2, width: number, height: number) => R;
    Platform: (position: V2, width: number, height: number) => R;
    PushWall: (position: V2, width: number, height: number, force: number) => R;
    RespawnArea: (position: V2, width: number, height: number, active: number) => R;
    Orb: (position: V2, radius: number, life: number, active: number, effects: Effect[], color: string) => R;
    LineWall: (ini: V2, end: V2) => R;
    TimedLineWall: (ini: V2, end: V2, active: number) => R;
  }
): R {
  switch (game_obj.kind) {
    case 'Wall':
      return handlers.Wall(game_obj.position, game_obj.width, game_obj.height);
    case 'Platform':
      return handlers.Platform(game_obj.position, game_obj.width, game_obj.height);
    case 'PushWall':
      return handlers.PushWall(game_obj.position, game_obj.width, game_obj.height, game_obj.force);
    case 'RespawnArea':
      return handlers.RespawnArea(game_obj.position, game_obj.width, game_obj.height, game_obj.active);
    case 'Orb':
      return handlers.Orb(game_obj.position, game_obj.radius, game_obj.life, game_obj.active, game_obj.effects, game_obj.color);
    case 'LineWall':
      return handlers.LineWall(game_obj.ini, game_obj.end);
    case 'TimedLineWall':
      return handlers.TimedLineWall(game_obj.ini, game_obj.end, game_obj.active);
  }
}
