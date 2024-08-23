import { Skill } from '../Skill/_';
import { Body } from '../Body/_';

/// Represents a playable character in the game.
/// - name: The hero's name
/// - skills: Map of key bindings to hero's skills
/// - body: Physical representation in the game world
/// - owner_id: ID of the controlling player
export type Hero = {
  name: string;
  skills: { [key: string]: Skill };
  body: Body;
  owner_id: number;
}
