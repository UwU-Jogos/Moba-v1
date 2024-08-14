/// Initializes a game map with simple GameObjects.
///
/// # Input
///
/// This function takes no parameters.
///
/// # Output
///
/// Returns a GameMap with predefined dimensions and a set of GameObjects.

import { GameMap } from './_';
import { GameObject } from './GameObject/_';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';

export function init(): GameMap {
  const { width, height } = get_canvas_dimensions();

  const orb_square_side = 100;
  const window_size = 20;

  const objects: GameObject[] =
  [
    {
      kind: "LineWall",
      ini: {
        x: 750,
        y: 100,
      },
      end: {
        x: 750,
        y: 80,
      }
    },
    {
      kind: "LineWall",
      ini: {
        x: 600,
        y: 100,
      },
      end: {
        x: 750,
        y: 100,
      }
    },

    {
      kind: "LineWall",
      ini: {
        x: 450,
        y: 450,
      },
      end: {
        x: 450,
        y: 480,
      }
    },
    {
      kind: "LineWall",
      ini: {
        x: 300,
        y: 450,
      },
      end: {
        x: 450,
        y: 450,
      }
    },

    {
      kind: "LineWall",
      ini: {
        x: 850,
        y: 500,
      },
      end: {
        x: 850,
        y: 525,
      }
    },
    {
      kind: "LineWall",
      ini: {
        x: 700,
        y: 500,
      },
      end: {
        x: 850,
        y: 500,
      }
    },

    {
      kind: "LineWall",
      ini: {
        x: 120,
        y: 100,
      },
      end: {
        x: 120,
        y: 300,
      }
    },
    {
      kind: "LineWall",
      ini: {
        x: 90,
        y: 100,
      },
      end: {
        x: 120,
        y: 100,
      }
    },

    // orb map
    // Top wall left
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) - orb_square_side / 2,
      },
      end: {
        x: (width / 2) - window_size / 2,
        y: (height / 2) - orb_square_side / 2,
      }
    },
    // Top wall right
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) + window_size / 2,
        y: (height / 2) - orb_square_side / 2,
      },
      end: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) - orb_square_side / 2,
      }
    },
    // Bottom wall left
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) + orb_square_side / 2,
      },
      end: {
        x: (width / 2) - window_size / 2,
        y: (height / 2) + orb_square_side / 2,
      }
    },
    // Bottom wall right
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) + window_size / 2,
        y: (height / 2) + orb_square_side / 2,
      },
      end: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) + orb_square_side / 2,
      }
    },
    // Left wall top
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) - orb_square_side / 2,
      },
      end: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) - window_size / 2,
      }
    },
    // Left wall bottom
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) + window_size / 2,
      },
      end: {
        x: (width / 2) - orb_square_side / 2,
        y: (height / 2) + orb_square_side / 2,
      }
    },
    // Right wall top
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) - orb_square_side / 2,
      },
      end: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) - window_size / 2,
      }
    },
    // Right wall bottom
    {
      kind: "LineWall",
      ini: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) + window_size / 2,
      },
      end: {
        x: (width / 2) + orb_square_side / 2,
        y: (height / 2) + orb_square_side / 2,
      }
    }
  ];
 return {
    width,
    height,
    objects
  };
}
