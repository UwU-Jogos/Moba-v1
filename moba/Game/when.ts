/// Updates the game state based on an action.
///
/// # Input
///
/// * `action` - The action to be applied to the game state
/// * `gs` - The current game state
///
/// # Output
///
/// Returns the updated GameState after applying the action

import { Action } from '../Action/_';
import { GameState } from '../GameState/_';
import { Player } from '../Player/_';
import { Skill } from '../Skill/_';
import { create_skill } from '../Skill/create';
import { init as init_player } from '../Player/init';
import { CharacterType } from '../Character/type';
import { create_character } from '../Character/create_character';

export function when(action: Action, gs: GameState): GameState {
  let players = gs.players;
  let skills = gs.skills;

  if (!players.has(action.pid)) {
    const initial_name = action.$ === "SetNick" ? action.name : "Anon";
    const character_type = action.$ === "SetNick" ? action.character : CharacterType.TRIANGLE;
    players = players.set(action.pid, init_player(action.pid, initial_name, character_type));
  }

  switch (action.$) {
    case "SetNick": {
      players = players.update(action.pid, player => {
        if (!player) return player;
        return { ...player, name: action.name } as Player;
      });
      break;
    }

    case "SkillEvent": {
      if (action.down) {
        const player = players.get(action.pid);
        if (!player) return gs;

        const current_tick = gs.tick;
        const last_skill_time = player.active_skills[action.key] || 0;

        const character = create_character(player.character);
        const skill_cooldown = character.skills[action.key]?.cooldown || 0;
        // const skill_cooldown = 0;

        if (current_tick - last_skill_time >= skill_cooldown) {
          const new_skill : Skill | null = create_skill(action, player, current_tick);

          if (!new_skill) return gs;
          skills = skills.set(new_skill.id, new_skill);

          // Update the last skill use time for this player and key
          players = players.update(action.pid, p => {
            if (!p) return p;
            return {
              ...p,
              active_skills: { ...p.active_skills, [action.key]: current_tick },
              shots: (action.key === "E") ? p.shots + 1 : p.shots
            };
          });
        }
      }
      break;
    }

    case "MouseClick": {
      players = players.update(action.pid, player => {
        if (!player) return player;
        return { ...player, target_pos: { x: action.x, y: action.y } } as Player;
      });
      break;
    }
    case "MovementEvent": {
      players = players.update(action.pid, player => {
        if (!player) return player;
        return { ...player, key: { ...player.key, [action.key]: action.down } } as Player;
      });
      break;
    }
  }
  return { ...gs, players, skills };
}
