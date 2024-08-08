/// Represents a player in the game.
///
/// # Description
///
/// A player entity with unique identifier, name, position, target position, and key states.
///
/// # Fields
///
/// * `id` - The unique identifier of the player
/// * `name` - The name of the player
/// * `pos` - The current position of the player in 2D space
/// * `target_pos` - The target position of the player in 2D space
/// * `key` - An object representing the state of various keys

import { UID } from '../UID/_';
import { Name } from '../Name/_';
import { V2 } from '../V2/_';
import { Key } from '../Key/_';
import { Life } from '../Life/_';
import { basic } from '../Skill/basic';

export type Player = {
  id: UID;
  name: Name;
  pos: V2;
  target_pos: V2;
  skills: { [key: Key]: basic };
  active_skills: { [key: string]: number }; 
  life: Life;
};
