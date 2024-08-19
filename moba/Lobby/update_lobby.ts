/// Updates the lobby display with the current number of players.
///
/// # Description
///
/// This function updates the HTML element with id 'lobby-players' to show
/// the current number of players in the lobby compared to the player limit.
///
/// # Arguments
///
/// * `players_in_the_room` - An array containing the players currently in the lobby
///
/// # Side effects
///
/// Updates the innerHTML of the 'lobby-players' element if it exists.

import { PLAYERS_LIMIT } from '../Helpers/consts';
import { UID } from '../Types/UID/_';

export function update_lobby(players_in_the_room: UID[]): void {
  const lobby_players = document.getElementById('lobby-players');
  if (lobby_players) {
    lobby_players.innerHTML = `Players in lobby: ${players_in_the_room.length}/${PLAYERS_LIMIT}`;
  }
}
