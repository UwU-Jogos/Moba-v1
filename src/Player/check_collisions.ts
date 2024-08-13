import { Player } from './_';
import { UID } from '../UID/_';
import { V2 } from '../V2/_';
import { GameMap } from '../GameMap/_';
import { Map } from 'immutable';
import { GameObject } from '../GameMap/GameObject/_';
import { check_collision as check_player_collision } from './check_collision';
import { check_game_object_collision } from './check_game_object_collision';

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
