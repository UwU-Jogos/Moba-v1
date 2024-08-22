/// Initializes the game timer.
///
/// # Description
///
/// This function creates and initializes a Timer object for the game.
/// It sets up a display element for the timer, calculates the total game time,
/// and sets the initial remaining time.
///
/// # Returns
///
/// Returns a Timer object with the following properties:
/// * `time_display`: An HTMLDivElement for displaying the timer
/// * `remaining_time`: The initial remaining time (in seconds)
/// * `game_time`: The total game time (in seconds)
///
/// # Side Effects
///
/// Creates and appends a new div element to the document body for displaying the timer.

import { Timer } from "./_";


export function init(GAME_TIME: number, TIME_TO_START_GAME: number): Timer {
  const time_display = document.createElement('div');
  time_display.style.position = 'absolute';
  time_display.style.top = '10px';
  time_display.style.left = '10px';
  time_display.style.color = 'black';
  time_display.style.fontSize = '20px';
  time_display.style.userSelect = 'none';
  time_display.style.pointerEvents = 'none';
  document.body.appendChild(time_display);
  const SHOW_DELAY = 2;
  const game_time = GAME_TIME + TIME_TO_START_GAME + SHOW_DELAY;
  return {
    time_display,
    remaining_time: game_time,
    game_time,
  } as Timer;
}
