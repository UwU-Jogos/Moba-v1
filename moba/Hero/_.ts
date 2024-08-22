import { Skill } from '../Skill/_';
import { Body } from '../Body/_';

// Represents a hero in the game
// - id: unique identifier for the hero
// - skills: an object of skill names to Skill objects
export type Hero = {
  id: string;
  skills: { [key: string]: Skill };
  body: Body;
};

// for now ignore stats, animation and current frame. Focus on movement and connecting player and hero
