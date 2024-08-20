import { Skill } from "./_";
import { Action } from "../Action/_";
import { create_character } from "../Character/create_character";
import { Player } from "../Player/_";

export function create_skill(action: Action, player: Player, current_tick: number): Skill | null {
  if (action.$ !== "SkillEvent") { return null; }
  const player_character = create_character(player.character);
  switch (action.key) {
    case 'E': {
      const skill = player_character.skills[action.key];
      if (!skill) { return null; }

      const target = { x: action.x, y: action.y };

      // Check if it's the 4th, 8th, 12th, etc. shot
      const is_fourth_shot = (player.shots + 1) % 4 === 0;

      return {
        id: `${action.pid}_${current_tick}`,
        $: 'Projectile',
        effects: is_fourth_shot ? [ { $: 'ShotThroughWall', active: true } ] : [],
        pos: player.pos,
        owner_id: action.pid,
        damage: skill.damage,
        speed: skill.speed,
        range: skill.range,
        target,
        cooldown: skill.cooldown
      };
    }

    case 'Q': {
      const skill = player_character.skills[action.key];
      if (!skill) { return null; }

      return {
        id: `${action.pid}_${current_tick}`,
        $: 'HealArea',
        effects: [],
        pos: player.pos,
        owner_id: action.pid,
        amount: skill.amount,
        radius: skill.radius,
        cooldown: skill.cooldown
      };
    }

    default:
      return null;
  }
}
