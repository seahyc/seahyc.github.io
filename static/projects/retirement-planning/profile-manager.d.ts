import type { AppState, ProfileRecord } from "./types.js";
export declare function createProfile(state: AppState): ProfileRecord;
export declare function duplicateProfile(state: AppState, profileId: string | null): ProfileRecord | null;
export declare function deleteProfile(state: AppState, profileId: string | null): boolean;
