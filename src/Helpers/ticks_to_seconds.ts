import { TPS } from './consts';

export function ticks_to_Seconds(ticks: number): number {
  return ticks / TPS;
}


