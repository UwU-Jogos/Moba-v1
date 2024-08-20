/// Initializes a new Stats object.
///
/// # Description
///
/// Creates a new Stats object with initial values.
///
/// # Output
///
/// A new Stats object with kills initialized to 0.

import { Stats } from './_';
import { PLAYER_INITIAL_LIFE } from '../Helpers/consts';

export function init_stats(): Stats {
  return {
    kills: 0,
    max_life: PLAYER_INITIAL_LIFE,
    lifes: 3,
    destroyed_orbs: 0,
    damage_multiplier: 1,
  };
}
