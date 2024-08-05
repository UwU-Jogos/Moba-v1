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

const PRADIUS = 10;
const TPS = 32;

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  //const { width, height } = { 800, 1000 };
  const width = 1000;
  const height = 800;

  const players = gs.players.map((player, uid) => {
    if (!player) return player;
    
    const dx = ((player.key["D"] ? 1 : 0) + (player.key["A"] ? -1 : 0)) * dt * 128;
    const dy = ((player.key["S"] ? 1 : 0) + (player.key["W"] ? -1 : 0)) * dt * 128;
    
    let newX = Math.max(PRADIUS, Math.min(width - PRADIUS, (player.pos.x + dx)));
    let newY = Math.max(PRADIUS, Math.min(height - PRADIUS, (player.pos.y + dy)));
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

