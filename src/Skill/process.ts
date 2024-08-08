
import { Player } from '../Player/_';
import { UID } from '../UID/_';

export function process_player_skills(state_tick: number, end_tick: number, skill_id: string, player: Player, pid: UID): void {
  if (state_tick >= end_tick) {
    delete player.active_skills[skill_id];
  } else {
    const skill = Object.values(player.skills).find(
      (s) => s.id === skill_id
    );
    
    if (skill) {
      switch (skill.type) {
        case "melee":
          // Apply melee effect (e.g., damage nearby players)
          console.log(`Player ${pid} hit with melee skill`);
          break;

        case "target":
          // Apply target effect (e.g., heal or buff self)
          console.log(`Player ${pid} used target skill on self`);
          break;

        case "action":
          // Move projectile or apply continuous effect
          console.log(`Player ${pid} is using action skill`);
          break;
      }
    }
  }
}
