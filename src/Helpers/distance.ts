import { V2 } from "../V2/_";

export function distance(p1: V2, p2: V2): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.floor(Math.sqrt(dx * dx + dy * dy));
}
