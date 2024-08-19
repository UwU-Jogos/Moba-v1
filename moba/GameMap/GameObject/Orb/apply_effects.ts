import { Player } from "../../../Player/_";
import { GameObject } from "../_";
import { Effect } from "../../../Types/Effect/_";

// Applies the effects of an orb to a player
// - player: the player to apply the effects to
// - orb: the orb containing the effects to apply
// = an updated player with the orb effects applied
export function apply_effects(player: Player, orb: GameObject & { kind: 'Orb', effects: Effect[] }): Player {
  return orb.effects.reduce((updated_player, effect) => {
    switch (effect.$) {
      case "OrbHeal": {
        console.log("FOUND AN ORB HEAL");
        const new_life = Math.min(updated_player.life + effect.amount, updated_player.stats.max_life);
        return { ...updated_player, life: new_life };
      }
      case "OrbDamageBuff": {
        console.log("FOUND A DAMAGE BUFF");
        const new_effects = [...updated_player.effects, effect];
        return { ...updated_player, effects: new_effects };
      }
      default: {
        return updated_player;
      }
    }
  }, player);
}
