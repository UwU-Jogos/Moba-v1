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
/// * `team` - the Team the player was assigned in the lobby
/// * `character` - The character type of the player
/// * `skills` - An object mapping keys to basic skills
/// * `active_skills` - An object tracking active skills and their durations
/// * `life` - The current life of the player
/// * `key` - An object representing the state of various keys (pressed or not)
/// * `stats` - An object representing the player's stats
/// * `effects` - An array of active effects on the player

import { UID } from '../UID/_';
import { Name } from '../Name/_';
import { V2 } from '../V2/_';
import { Key } from '../Key/_';
import { Life } from '../Life/_';
import { TeamType } from '../Team/type';
import { CharacterType } from '../Character/type';
import { basic } from '../Skill/basic';
import { Stats } from '../Stats/_';
import { Effect } from '../Effect/_';

export type Player = {
  id: UID;
  name: Name;
  pos: V2;
  target_pos: V2;
  skills: { [key: Key]: basic };
  active_skills: { [key: string]: number }; 
  life: Life;
  team: TeamType;
  character: CharacterType;
  key: { [key: Key]: boolean };
  stats: Stats;
  effects: Effect[]; 
  shots: number;
};
