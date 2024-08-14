/// Creates timed line walls for the orb area.
///
/// # Description
///
/// This function generates timed line walls that form a square around the orb,
/// with one side missing on a rotating basis.
///
/// # Args
///
/// * `tick` - The current game tick
///
/// # Returns
///
/// An array of GameObject representing the timed line walls

import { GameObject } from './GameObject/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { TPS } from '../Helpers/consts';
import { V2 } from '../V2/_';

export function create_timed_orb_walls(tick: number): GameObject[] {
  const { width, height } = get_canvas_dimensions();
  const orb_square_side = 100;
  const window_size = 20;

  const orb_walls: { ini: V2, end: V2 }[] = [
    // Top wall center
    {
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
