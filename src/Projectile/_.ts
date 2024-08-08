import { Skill } from "../Skill/_";
import { UID } from "../UID/_";
import { V2 } from "../V2/_";


export type Projectile = {
  id: string;
  skillType: Skill;
  ownerId: UID;
  pos: V2;
  target: V2;
  speed: number;
  remainingDistance: number;
  remainingDuration: number;
  range: number;
};
