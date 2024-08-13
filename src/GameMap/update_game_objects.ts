import { GameMap } from './_';
import { GameObject } from './GameObject/_';

/// Updates the game objects in the game map.
///
/// # Input
///
/// * `game_map` - The current game map
/// * `new_respawn_areas` - Array of new respawn area game objects to add
/// * `new_orbs` - Array of new orb game objects to add
///
/// # Output
///
/// Returns an updated GameMap with filtered and updated game objects

export function update_game_objects(game_map: GameMap, new_respawn_areas: GameObject[], new_orbs: GameObject[]): GameMap {
  return {
    ...game_map,
    objects: [
      ...game_map.objects.filter(obj =>
        (obj.kind !== 'RespawnArea' && obj.kind !== 'Orb' && obj.kind !== 'TimedLineWall') ||
        ((obj.kind === 'RespawnArea' || obj.kind === 'Orb' || obj.kind === 'TimedLineWall') && obj.active > 0)
      ).map(obj => {
        if (obj.kind === 'RespawnArea' || obj.kind === 'Orb' || obj.kind === 'TimedLineWall') {
          return {
            ...obj,
            active: obj.active - 1
          };
        }
        return obj;
      }),
      ...new_respawn_areas,
      ...new_orbs
    ]
  };
}
