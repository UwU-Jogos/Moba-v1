import { Skill } from "../Skill/_";
import { UID } from "../UID/_";
import { Damage } from "../Damage/_";
import { V2 } from "../V2/_";
import { Effect } from "../Effect/_";


export type Projectile = {
  id: string;
  skill_type: Skill;
  owner_id: UID;
  pos: V2;
  target: V2;
  speed: number;
  remaining_distance: number;
  remaining_duration: number;
  range: number;
  damage: Damage;
  effects: Effect[];
};
