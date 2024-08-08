import { Skill } from "./_";

export type basic = {
  id: string;
  type: Skill;
  cooldown: number;
  duration: number;
  range: number;
};