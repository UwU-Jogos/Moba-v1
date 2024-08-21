/// Represents a player in the game.
///
/// # Description
///
/// A player entity with unique identifier, name, position, target position, skills, life, team, character, key states, stats, and effects.
///
/// # Fields
///
/// * `id` - The unique identifier of the player
/// * `name` - The name of the player
/// * `pos` - The current position of the player in 2D space
/// * `target_pos` - The target position of the player in 2D space
/// * `skills` - An object mapping keys to basic skills
/// * `life` - The current life of the player
/// * `key` - An object representing the state of various keys (pressed or not)
/// * `stats` - An object representing the player's stats
/// * `effects` - An array of active effects on the player
/// * `shots` - The number of shots fired by the player

import { V2 } from "../../base/V2/_";

export type Player = {
  id: number;
  name: string;
  pos: V2;
  target_pos: V2;
  life: number;
  key: { [key: string]: boolean };
};
