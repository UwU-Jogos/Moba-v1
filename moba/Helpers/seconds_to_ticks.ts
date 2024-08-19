import { TPS } from './consts';

export function seconds_to_ticks(seconds: number): number {
  return Math.round(seconds * TPS);
}