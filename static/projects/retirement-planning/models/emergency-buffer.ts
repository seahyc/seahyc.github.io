import type { ProfileData } from "../types.js";

export interface EmergencyBufferEstimate {
  reserveMonths: number;
  base: number;
  minimum: number;
  balanced: number;
  conservative: number;
}

export function estimateEmergencyBuffer({ profile, medical }: { profile: Pick<ProfileData, "basicSpendMonthly">; medical: { expectedEmergency: number } }): EmergencyBufferEstimate {
  const monthlyBasic = profile.basicSpendMonthly;
  const reserveMonths = monthlyBasic < 2200 ? 9 : monthlyBasic < 3500 ? 8 : 6;
  const base = monthlyBasic * reserveMonths;
  const balanced = base + medical.expectedEmergency * 0.6;
  const conservative = base + medical.expectedEmergency * 0.95;
  const minimum = base + medical.expectedEmergency * 0.35;
  return {
    reserveMonths,
    base,
    minimum,
    balanced,
    conservative,
  };
}
