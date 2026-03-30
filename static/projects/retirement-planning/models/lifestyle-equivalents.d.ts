import type { DestinationCost, LifestyleEquivalent } from "../types.js";
export interface LifestyleEquivalentRow extends LifestyleEquivalent {
    key: string;
    perTrip: number;
}
export declare function buildLifestyleEquivalents(discretionaryAnnual: number, assumptions?: Record<string, DestinationCost>): LifestyleEquivalentRow[];
