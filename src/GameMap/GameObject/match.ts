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

export function match<R>(
  game_obj: GameObject,
  handlers: {
    Wall: (position: V2, width: number, height: number) => R;
    Platform: (position: V2, width: number, height: number) => R;
  }
): R {
  switch (game_obj.kind) {
    case 'Wall':
      return handlers.Wall(game_obj.position, game_obj.width, game_obj.height);
    case 'Platform':
      return handlers.Platform(game_obj.position, game_obj.width, game_obj.height);
  }
}