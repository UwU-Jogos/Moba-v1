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

  const players = gs.players.map((player, uid) => {
    if (!player) return player;
    
    const dx = ((player.key["D"] ? PLAYER_SPEED : 0) + (player.key["A"] ? -PLAYER_SPEED : 0)) * dt * 128;
    const dy = ((player.key["S"] ? PLAYER_SPEED : 0) + (player.key["W"] ? -PLAYER_SPEED : 0)) * dt * 128;
    
    let newX = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, (player.pos.x + dx)));
    let newY = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, (player.pos.y + dy)));
    return {
      ...player,
      pos: {
        x: newX,
        y: newY,
      }
    };
  }).toMap();

  return {
    ...gs,
    tick: gs.tick + 1,
    players: players as Map<UID, Player>
  };
}

