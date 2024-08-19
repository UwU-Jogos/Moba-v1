/// Represents the stats of a player in the game.
///
/// # Description
///
/// A structure holding various statistical information about a player's performance.
///
/// # Fields
///
/// * `kills` - The number of kills the player has achieved
/// * `max_life` - The maximum life of the player
/// * `lifes` - How many times the player will respawn if they die
/// * `destroyed_orbs` - How many times the player has destroyed the orb
/// * `damage_multiplier` - The multiplier applied to the player's damage output
/// * `total_life_healed` - The total amount of life the player has healed
/// * `total_damage_received` - The total amount of damage the player has received
/// * `total_damage_caused` - The total amount of damage the player has caused
///
/// # Type Definition
///

export type Stats = {
  kills: number;
  max_life: number;
  lifes: number;
  destroyed_orbs: number;
  damage_multiplier: number;
  total_life_healed: number;
  total_damage_received: number;
  total_damage_caused: number;
};
