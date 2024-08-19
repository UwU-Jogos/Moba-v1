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

import { Map } from 'immutable';
import { Player } from './_';
import { UID } from '../Types/UID/_';
import { V2 } from '../V2/_';
import { GameMap } from '../GameMap/_';
import { check_collision } from './check_collision';
import { check_game_object_collision } from './check_game_object_collision';
import { GameObject } from '../GameMap/GameObject/_';

export function check_collisions(player: Player, uid: UID, new_pos: V2, mutable_players: Map<UID, Player>, game_map: GameMap): V2 {
  mutable_players.forEach((other_player, other_uid) => {
    if (uid !== other_uid) {
      new_pos = check_collision(player, uid, other_player, other_uid, new_pos);
    }
  });

  game_map.objects.forEach((game_object: GameObject) => {
    new_pos = check_game_object_collision(player, new_pos, game_object);
  });

  return new_pos;
}