import type { CpfPolicyResolution, CpfPolicySource } from "../types.js";
export interface CpfPolicyYear {
    brs: number;
    frs: number;
    ers: number;
    bhs: number;
    year?: number;
    sources?: CpfPolicySource[];
    note?: string;
}
export declare function getCurrentPolicyYear(): number;
export declare const CPF_POLICY_SOURCES: Record<number, CpfPolicySource[]>;
export declare const CPF_POLICY_BY_YEAR: Record<number, CpfPolicyYear>;
export declare function resolveCpfYear(year: number): CpfPolicyYear;
export declare function resolveCpfPolicyTrace(year: number): CpfPolicyResolution[];
