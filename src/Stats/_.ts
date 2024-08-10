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
/// * `lifes` - How many times it will respawn if dies 
///
/// # Type Definition
///

export type Stats = {
  kills: number;
  max_life: number;
  lifes: number;
};
