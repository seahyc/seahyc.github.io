import type { ProfileData } from "../types.js";
export interface EmergencyBufferEstimate {
    reserveMonths: number;
    base: number;
    minimum: number;
    balanced: number;
    conservative: number;
}
export declare function estimateEmergencyBuffer({ profile, medical }: {
    profile: Pick<ProfileData, "basicSpendMonthly">;
    medical: {
        expectedEmergency: number;
    };
}): EmergencyBufferEstimate;
