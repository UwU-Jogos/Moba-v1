/// Creates an Orb game object.
///
/// # Description
///
/// This function creates an Orb game object positioned at the center of the given dimensions
/// with a specified radius, life, and active duration. It deterministically chooses between
/// a pink healing orb (75% chance) and a green damage buff orb (25% chance).
///
/// # Parameters
///
/// * `width` - The width of the game area
/// * `height` - The height of the game area
///
/// # Returns
///
/// A GameObject of kind 'Orb' with position, radius, life, active properties, and effects.

import { GameObject } from '../../GameObject/_';
import { PLAYER_RADIUS } from '../../../Helpers/consts';
import { seconds_to_ticks } from '../../../Helpers/seconds_to_ticks';

const pink_orb = {
  kind: 'Orb',
  position: { x: 0, y: 0 },
  radius: PLAYER_RADIUS,
  life: 100,
  active: seconds_to_ticks(30),
  effects: [{ $: 'OrbHeal', amount: 50 }],
  color: 'pink'
};

const green_orb = {
  kind: 'Orb',
  position: { x: 0, y: 0 },
  radius: PLAYER_RADIUS,
  life: 100,
  active: seconds_to_ticks(30),
  effects: [{ $: 'OrbDamageBuff', percentage: 50, active: seconds_to_ticks(10), player_color: 'green' }],
  color: 'green'
};

let seed = 0xDEADBEEF; // Initial seed value
function pseudo_random(): number {
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return (seed >>> 0) % 100; // Ensure positive value and range 0-99
}

export function create_orb(width: number, height: number): GameObject {
  const orb_selector = pseudo_random();
  const orb = orb_selector < 75 ? { ...pink_orb } : { ...green_orb };
  orb.position = { x: width / 2, y: height / 2 };
  return orb as GameObject;
}
