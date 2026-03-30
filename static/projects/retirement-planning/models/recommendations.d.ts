export declare function summarizePanel(profile: any, plan: any, result: any, recommendations: any): {
    title: string;
    summary: any;
}[];
export declare function buildExpertReview(profile: any, plan: any, result: any, recommendations: any, sensitivities: any): {
    assumptions: string[];
    findings: string[];
    rationale: any;
};
export declare function buildPlanDiffSummary(currentBundle: any, comparisonBundle: any): {
    label: string;
    current: any;
    comparison: any;
    delta: number;
    unit: string;
}[];
