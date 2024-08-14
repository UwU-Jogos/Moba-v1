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
import { update_player } from '../Player/update_player';
import { is_dead as is_player_dead } from '../Player/is_dead';

import { UID } from '../UID/_';

import { Map } from 'immutable';

import { TPS } from '../Helpers/consts';

import { GameObject } from '../GameMap/GameObject/_';
import { update_game_objects } from '../GameMap/update_game_objects';
import { create_timed_orb_walls } from '../GameMap/create_timed_orb_walls';
import { create_respawn_area } from '../GameMap/create_respawn_area';
import { create_orb } from '../GameMap/create_orb';

import { update_projectile_system } from '../Projectile/update_projectile_system';

export function tick(gs: GameState): GameState {
  const dt = 1 / TPS;
  const new_respawn_areas: GameObject[] = [];
  const new_orbs: GameObject[] = [];

  const [updated_gs, projectile_system] = update_projectile_system(gs, dt);

  const updated_players = updated_gs.players.withMutations((mutable_players: Map<UID, Player>) => {
    mutable_players.forEach((player, uid) => {
      const updated_player: Player = update_player(player, uid, dt, mutable_players, updated_gs.game_map);
      if (updated_player !== player) {
        mutable_players.set(uid, updated_player);
        if (is_player_dead(player) && !is_player_dead(updated_player)) {
          new_respawn_areas.push(create_respawn_area(updated_player));
          new_orbs.push(create_orb());
        }
      }
    });
  });

  const updated_game_map = update_game_objects(updated_gs.game_map, new_respawn_areas, new_orbs);

  if (gs.tick % (5 * TPS) === 0) {
    const new_timed_orb_walls = create_timed_orb_walls(gs.tick);
    updated_game_map.objects.push(...new_timed_orb_walls);
  }

  updated_game_map.objects = updated_game_map.objects.filter(obj =>
    obj.kind !== 'TimedLineWall' || (obj.kind === 'TimedLineWall' && obj.active > 0)
  );

  return {
    ...gs,
    tick: gs.tick + 1,
    players: updated_players,
    projectile_system,
    game_map: updated_game_map,
  };
}
