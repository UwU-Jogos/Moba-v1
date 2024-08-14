import { GameState } from "../GameState/_";
import { Key } from "../Key/_";
import { create as create_projectile } from "../Projectile/create";
import { UID } from "../UID/_";
import { Damage } from "../Damage/_";
import { V2 } from "../V2/_";
import { create_character } from '../Character/create_character';

// Update the activateSkill function
export function activate(gs: GameState, player_id: UID, skill_key: Key, target_pos: V2, damage: Damage): GameState {
  const player = gs.players.get(player_id);
  if (!player) return gs;

  const skill = player.skills[skill_key];
  if (!skill) return gs;

  const current_tick = gs.tick;
  if (player.active_skills[skill.id] && current_tick < player.active_skills[skill.id]) {
    return gs;
  }

  // Get the character and check for MultipleShot effect
  const character = create_character(player.character);
  const multiple_shot = character.effects.find(effect => effect.$ === 'MultipleShot');
  const shots_number = multiple_shot ? multiple_shot.shots_number : 1;

  let new_projectile_system = gs.projectile_system;

  // Create multiple projectiles if MultipleShot effect exists
  for (let i = 0; i < shots_number; i++) {
    const [id, new_projectile] = create_projectile(skill, player_id, player.pos, target_pos, damage);
    const unique_id = `${id}-${i}`; // Add an index to make each projectile ID unique

    // Check if this is the 4th, 8th, 12th, etc. shot and add ShotThroughWall effect to the projectile if so
    if ((player.shots + i + 1) % 4 === 0) {
      new_projectile.effects.push({ $: 'ShotThroughWall', active: true });
    }

    new_projectile_system = new_projectile_system.set(unique_id, new_projectile);
  }

  // Update the skill cooldown
  const new_active_skills = { ...player.active_skills, [skill.id]: current_tick + skill.cooldown };
  const new_shots = player.shots + shots_number;

  const updated_player = {
    ...player,
    active_skills: new_active_skills,
    shots: new_shots
  };

  const new_players = gs.players.set(player_id, updated_player);
  return {
    ...gs,
    players: new_players,
    projectile_system: new_projectile_system
  };
}