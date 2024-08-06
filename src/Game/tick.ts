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

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const { width, height } = get_canvas_dimensions();
  const interpolationFactor = 0.1; // Adjust this value to control smoothness

  const players = gs.players.map((player, uid) => {
    if (!player) return player;
    
    const dx = player.target_pos.x - player.pos.x;
    const dy = player.target_pos.y - player.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      const moveDistance = Math.min(distance, PLAYER_SPEED * dt * 128);
      const ratio = moveDistance / distance;
      
      // Interpolate the new position
      let newX = player.pos.x + dx * ratio * interpolationFactor;
      let newY = player.pos.y + dy * ratio * interpolationFactor;

      // Check collision with other players
      gs.players.forEach((otherPlayer, otherUid) => {
        if (uid !== otherUid) {
          const dx = newX - otherPlayer.pos.x;
          const dy = newY - otherPlayer.pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < PLAYER_RADIUS * 2) {
            const angle = Math.atan2(dy, dx);
            newX = otherPlayer.pos.x + Math.cos(angle) * PLAYER_RADIUS * 2;
            newY = otherPlayer.pos.y + Math.sin(angle) * PLAYER_RADIUS * 2;
          }
        }
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
