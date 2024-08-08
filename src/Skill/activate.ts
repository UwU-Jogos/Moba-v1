import { GameState } from "../GameState/_";
import { Key } from "../Key/_";
import { create as create_projectile } from "../Projectile/create";
import { UID } from "../UID/_";
import { Damage } from "../Damage/_";
import { V2 } from "../V2/_";

// Update the activateSkill function
export function activate(gs: GameState, player_id: UID, skill_key: Key, target_pos: V2, damage: Damage): GameState {
  const player = gs.players.get(player_id);
  if (!player) return gs;
  
  const skill = player.skills[skill_key];
  if (!skill) return gs;
  
  const current_tick = gs.tick;
  if (player.active_skills[skill.id] && current_tick < player.active_skills[skill.id]) {
    console.log("Skill is still on cooldown", player.active_skills[skill.id]);
    return gs;
  }
  
  // Activate the skill
  const [id, new_projectile] = create_projectile(skill, player_id, player.pos, target_pos, damage);
  const new_projectile_system = gs.projectile_system.set(id, new_projectile);
  
  // Update the skill cooldown
  const new_active_skills = { ...player.active_skills, [skill.id]: current_tick + skill.cooldown };
  const updated_player = { ...player, active_skills: new_active_skills };
  const new_players = gs.players.set(player_id, updated_player);
  return {
    ...gs,
    players: new_players,
    projectile_system: new_projectile_system
  };
}
