export interface CpfPolicyYear {
    brs: number;
    frs: number;
    ers: number;
    bhs: number;
}
export declare function getCurrentPolicyYear(): number;
export declare const CPF_POLICY_BY_YEAR: Record<number, CpfPolicyYear>;
export declare function resolveCpfYear(year: number): CpfPolicyYear;
