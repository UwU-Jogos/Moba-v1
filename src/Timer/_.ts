/// Represents the timer for the game.
///
/// # Description
///
/// The Timer type contains information about the game timer, including
/// the display element, remaining time, and total game time.
///
/// # Fields
///
/// * `time_display` - The HTML element used to display the timer
/// * `remaining_time` - The amount of time remaining in the game (in seconds)
/// * `game_time` - The total duration of the game (in seconds)

export type Timer = {
  time_display: HTMLDivElement;
  remaining_time: number;
  game_time: number;
};
