/// Updates the player's state based on input, collisions, and effects.
///
/// # Arguments
/// - player: The current player object
/// - uid: The unique identifier of the player
/// - dt: Delta time, the time elapsed since the last update
/// - mutable_players: A map of all players in the game
/// - game_map: The current game map
///
/// # Returns
/// An updated Player object with new position and effects

import { Player } from './_';
import { UID } from '../UID/_';
import { GameMap } from '../GameMap/_';
import { is_dead } from './is_dead';
import { respawn } from './respawn';
import { create_character } from '../Character/create_character';
import { PLAYER_SPEED } from '../Helpers/consts';
import { check_collisions } from './check_collisions';
import { clamp_to_canvas } from './clamp_to_canvas';
import { update_player_effects } from './update_player_effects';
import { Map } from 'immutable';

export function update_player(player: Player, uid: UID, dt: number, mutable_players: Map<UID, Player>, game_map: GameMap): Player {
  if (!player) return player;

  if (is_dead(player) && player.stats.lifes > 0) {
    return respawn(player);
  }

  const char = create_character(player.character);
  const move_speed_mult = char.effects.find(effect => effect.$ === 'IncreaseMoveSpeed')?.percentage || 0; 
  const speed = PLAYER_SPEED + (PLAYER_SPEED * move_speed_mult);

  const dx = ((player.key["D"] ? speed : 0) + (player.key["A"] ? -speed : 0)) * dt * 90;
  const dy = ((player.key["S"] ? speed : 0) + (player.key["W"] ? -speed : 0)) * dt * 90;

  let new_pos = { x: player.pos.x + dx, y: player.pos.y + dy };

  new_pos = check_collisions(player, uid, new_pos, mutable_players, game_map);
  new_pos = clamp_to_canvas(new_pos);

  const updated_effects = update_player_effects(player.effects);

  return {
    ...player,
    pos: new_pos,
    effects: updated_effects,
  };
}