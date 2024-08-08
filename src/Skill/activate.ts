import { GameState } from "../GameState/_";
import { Key } from "../Key/_";
import { create as create_projectile } from "../Projectile/create";
import { UID } from "../UID/_";
import { V2 } from "../V2/_";

// Update the activateSkill function
export function activate(gs: GameState, playerId: UID, skillKey: Key, targetPos: V2): GameState {
  const player = gs.players.get(playerId);
  if (!player) return gs;
  
  const skill = player.skills[skillKey];
  if (!skill) return gs;
  
  const currentTick = gs.tick;
  if (player.activeSkills[skill.id] && currentTick < player.activeSkills[skill.id]) {
    console.log("Skill is still on cooldown", player.activeSkills[skill.id]);
    return gs;
  }
  
  // Activate the skill
  const [id, newProjectile] = create_projectile(skill, playerId, player.pos, targetPos);
  const newProjectileSystem = gs.projectileSystem.set(id, newProjectile);
  
  // Update the skill cooldown
  const newActiveSkills = { ...player.activeSkills, [skill.id]: currentTick + skill.cooldown };
  const updatedPlayer = { ...player, activeSkills: newActiveSkills };
  const newPlayers = gs.players.set(playerId, updatedPlayer);
  return {
    ...gs,
    players: newPlayers,
    projectileSystem: newProjectileSystem
  };
}
