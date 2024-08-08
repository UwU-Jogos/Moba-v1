/// Updates the game state for a single tick.
///
/// # Input
///
/// * `state` - The current game state
///
/// # Output
///
/// Returns the updated GameState after processing a single tick

import { GameState } from '../GameState/_';
import { Player } from '../Player/_';
import { UID } from '../UID/_';
import { Map } from 'immutable';
import { get_canvas_dimensions } from '../Helpers/get_canvas_dimensions';
import { PLAYER_RADIUS, TPS, PLAYER_SPEED } from '../Helpers/consts';
import { GameObject } from '../GameMap/GameObject/_';
import { check_collision as check_player_collision } from '../Player/check_collision';
import { check_game_object_collision } from '../Player/check_game_object_collision';
import { V2 } from '../V2/_';

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolation_factor = 0.1; // Adjust this value to control smoothness

  const players = gs.players.map((player, uid) => {
    if (!player) return player;
    
    const dx = player.target_pos.x - player.pos.x;
    const dy = player.target_pos.y - player.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      const moveDistance = Math.min(distance, PLAYER_SPEED * dt * 128);
      const ratio = moveDistance / distance;
      
      // Interpolate the new position
      let newX = player.pos.x + dx * ratio * interpolation_factor;
      let newY = player.pos.y + dy * ratio * interpolation_factor;

      // Check collision with other players
      gs.players.forEach((other_player, other_uid) => {
        let result_pos = check_player_collision(uid, other_player, other_uid, { x: newX, y: newY });
        newX = result_pos.x;
        newY = result_pos.y;
      });

      // Check collision with GameObjects
      gs.game_map.objects.forEach((game_object: GameObject) => {
        let result_pos: V2 = check_game_object_collision(player, { x: newX, y: newY }, game_object);
        newX = result_pos.x; 
        newY = result_pos.y; 
      });

      // Clamp to canvas boundaries
      newX = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, newX));
      newY = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, newY));

      return {
        ...player,
        pos: {
          x: newX,
          y: newY,
        }
      };
    }

    return player;
  }).toMap();

  return {
    ...gs,
    tick: gs.tick + 1,
    players: players as Map<UID, Player>
  };
}
