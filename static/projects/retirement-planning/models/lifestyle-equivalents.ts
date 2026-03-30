import { DEFAULT_DESTINATION_COSTS } from "../constants.js";
import type { DestinationCost, LifestyleEquivalent } from "../types.js";

export interface LifestyleEquivalentRow extends LifestyleEquivalent {
  key: string;
  perTrip: number;
}

export function buildLifestyleEquivalents(discretionaryAnnual: number, assumptions: Record<string, DestinationCost> = DEFAULT_DESTINATION_COSTS): LifestyleEquivalentRow[] {
  return Object.entries(assumptions).map(([key, item]) => {
    const perTrip = item.airfare + item.insurance + item.duration * (item.hotelPerNight + item.dailySpend);
    const trips = discretionaryAnnual / perTrip;
    return {
      key,
      label: `${item.duration}-day ${item.label} trip`,
      perTrip,
      trips,
    };
  });
}
