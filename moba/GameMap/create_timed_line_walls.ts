/// Creates timed line walls for the game.
///
/// # Description
///
/// This function creates a set of timed line walls that form a square around the center of the game area,
/// with one wall missing based on the current tick count.
///
/// # Parameters
///
/// * `tick` - The current game tick
/// * `width` - The width of the game area
/// * `height` - The height of the game area
///
/// # Returns
///
/// An array of GameObject representing the timed line walls

import { GameObject } from '../GameMap/GameObject/_';
import { V2 } from '../V2/_';
import { TPS } from '../Helpers/consts';

export function create_timed_line_walls(tick: number, width: number, height: number): GameObject[] {
  const orb_square_side = 100;
  const window_size = 20;

  const orb_walls: { kind: 'LineWall', ini: V2, end: V2 }[] = [
    // Top wall center
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - window_size / 2,
        y: (height / 2) - orb_square_side / 2,
      },
      end: {
        x: (width / 2) + window_size / 2,
        y: (height / 2) - orb_square_side / 2,
      }
    },
    // Bottom wall center
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - window_size / 2,
        y: (height / 2) + orb_square_side / 2,
      },
      end: {
        x: (width / 2) + window_size / 2,
        y: (height / 2) + orb_square_side / 2,
      }
    },
    // Left wall center
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) - window_size / 2,
      },
      end: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) + window_size / 2,
      }
    },
    // Right wall center
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) - window_size / 2,
      },
      end: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) + window_size / 2,
      }
    }
  ];

  const wall_index = Math.floor(tick / (5 * TPS)) % 4;

  return orb_walls
    .filter((_, index) => index !== wall_index)
    .map(wall => ({
      kind: 'TimedLineWall',
      ini: wall.ini,
      end: wall.end,
      active: 5 * TPS // 5 seconds of active time
    }));
}
