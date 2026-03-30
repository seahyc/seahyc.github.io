import type { AiMode, AppendixPreset, DestinationCost, PlanData, ProfileRecord } from "./types.js";
export declare const APP_STORAGE_KEY = "retirement-planning-os-v1";
export declare const DEFAULT_DESTINATION_COSTS: Record<string, DestinationCost>;
export declare const AI_MODES: Array<{
    id: AiMode;
    label: string;
}>;
export declare const QUICK_ACTIONS: {
    readonly cpf: readonly [{
        readonly id: "max-topup";
        readonly label: "Max top-up allowed";
    }, {
        readonly id: "remaining-ers";
        readonly label: "Fill remaining ERS room";
    }, {
        readonly id: "basic-gap";
        readonly label: "Min top-up to hit basic needs";
    }, {
        readonly id: "discretionary-gap";
        readonly label: "Min top-up to hit total spend";
    }, {
        readonly id: "ma-cap";
        readonly label: "Set MA to BHS cap";
    }];
    readonly family: readonly [{
        readonly id: "tax-efficient";
        readonly label: "Allocate for max tax savings";
    }, {
        readonly id: "payout-efficient";
        readonly label: "Allocate for max parent payout";
    }, {
        readonly id: "split-evenly";
        readonly label: "Split child top-ups evenly";
    }];
    readonly medical: readonly [{
        readonly id: "public";
        readonly label: "Assume public care";
    }, {
        readonly id: "private";
        readonly label: "Assume private care";
    }, {
        readonly id: "insured";
        readonly label: "Use insurance-default scenario";
    }, {
        readonly id: "downside";
        readonly label: "Use conservative downside";
    }];
    readonly emergency: readonly [{
        readonly id: "buffer-min";
        readonly label: "Set minimum reserve";
    }, {
        readonly id: "buffer-balanced";
        readonly label: "Set balanced reserve";
    }, {
        readonly id: "buffer-conservative";
        readonly label: "Set conservative reserve";
    }];
};
export declare const DEFAULT_PROFILE: {
    name: string;
    profile: ProfileRecord["profile"];
    plans: Omit<PlanData, "id" | "profileId">[];
};
export declare const CREATE_PROFILE_NAME: (existing: number) => string;
export declare const CREATE_PLAN_NAME: (existing: number) => string;
export declare const APPENDIX_PRESETS: Array<{
    id: AppendixPreset;
    label: string;
}>;
export declare const CHART_IDS: readonly ["incomeSpend", "assetCpf", "survivalFit", "actionImpact"];
