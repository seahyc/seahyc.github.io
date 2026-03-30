export declare function getBaseRemainingYears(age: any, sex: any): any;
export declare function buildBaselineSurvival(age: any, sex: any, horizon?: number): {
    medianAge: any;
    points: {
        age: any;
        qx: number;
        survival: number;
    }[];
};
