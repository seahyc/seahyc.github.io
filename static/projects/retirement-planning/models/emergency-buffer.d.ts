export declare function estimateEmergencyBuffer({ profile, medical }: {
    profile: any;
    medical: any;
}): {
    reserveMonths: number;
    base: number;
    minimum: number;
    balanced: number;
    conservative: number;
};
