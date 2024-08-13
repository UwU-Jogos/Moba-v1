/// Checks collisions between a player and other players, as well as game objects.
///
/// # Arguments
/// - player: The player to check collisions for.
/// - uid: The unique identifier of the player.
/// - new_pos: The proposed new position of the player.
/// - mutable_players: A map of all players in the game.
/// - game_map: The game map containing game objects.
///
/// # Returns
/// The adjusted position after collision checks.
export function check_collisions(player: Player, uid: UID, new_pos: V2, mutable_players: Map<UID, Player>, game_map: GameMap): V2 {
  mutable_players.forEach((other_player, other_uid) => {
    if (uid !== other_uid) {
      new_pos = check_player_collision(player, uid, other_player, other_uid, new_pos);
    }
  });

  game_map.objects.forEach((game_object: GameObject) => {
    new_pos = check_game_object_collision(player, new_pos, game_object);
  });

  return new_pos;
}