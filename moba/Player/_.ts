/// Represents a player in the game.
//
/// - id: Unique identifier
/// - name: Player's name
/// - key: Key states
/// - hero: Associated hero

import { Hero } from "../Hero/_";

export type Player = {
  id: number;
  name: string;
  key: { [key: string]: boolean };
  hero: Hero;
};
