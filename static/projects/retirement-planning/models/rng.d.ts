export type Rng = () => number;
export declare function hashSeed(input: string): number;
export declare function mulberry32(seed: number): Rng;
export declare function normal(rng: Rng, mean?: number, sd?: number): number;
export declare function lognormalMultiplier(rng: Rng, sigma: number): number;
