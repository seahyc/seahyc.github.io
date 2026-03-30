export declare function computeRecommendations(profile: any, plan: any, result: any): {
    title: string;
    why: string;
    risk: string;
    confidence: string;
    shortfallReduction: number;
    estateImpact: any;
    liquidityImpact: number;
    tag: string;
}[];
export declare function buildSensitivityDiagnostics(profile: any, plan: any, result: any): {
    id: string;
    label: string;
    impact: any;
    unit: string;
    signal: string;
    why: string;
}[];
