/// Represents a player in the game.
///
/// # Description
///
/// A player entity with unique identifier, name, position, target position, life, key states, and associated body.
///
/// # Fields
///
/// * `id` - The unique identifier of the player
/// * `name` - The name of the player
/// * `pos` - The current position of the player in 2D space
/// * `target_pos` - The target position of the player in 2D space
/// * `life` - The current life of the player
/// * `key` - An object representing the state of various keys (pressed or not)
/// * `body` - The physical body associated with the player in the game world

import { V2 } from "../../base/V2/_";
import { Body } from "../Body/_";

export type Player = {
  id: number;
  name: string;
  pos: V2;
  target_pos: V2;
  life: number;
  key: { [key: string]: boolean };
  body: Body;
};
