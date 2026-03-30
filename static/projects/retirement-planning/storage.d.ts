import type { AppState } from "./types.js";
export declare function loadState(): Promise<AppState>;
export declare function saveState(state: AppState): Promise<void>;
export declare function wipeState(): Promise<AppState>;
export declare function newId(prefix: string): string;
export declare function deepClone<T>(value: T): T;
