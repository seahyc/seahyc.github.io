import { getCurrentPolicyYear } from "./policy/cpf-years.js";
import type { AiMode, AppendixPreset, CpfPlanType, DestinationCost, PlanData, ProfileRecord } from "./types.js";

export const APP_STORAGE_KEY = "retirement-planning-os-v1";

export const DEFAULT_DESTINATION_COSTS: Record<string, DestinationCost> = {
  japan: { label: "Japan", airfare: 650, hotelPerNight: 170, dailySpend: 95, insurance: 60, duration: 8 },
  europe: { label: "Europe", airfare: 1200, hotelPerNight: 220, dailySpend: 130, insurance: 100, duration: 12 },
  africa: { label: "Africa", airfare: 1350, hotelPerNight: 190, dailySpend: 120, insurance: 120, duration: 11 },
  us: { label: "United States", airfare: 1400, hotelPerNight: 230, dailySpend: 145, insurance: 110, duration: 10 },
  sea: { label: "Southeast Asia", airfare: 260, hotelPerNight: 90, dailySpend: 70, insurance: 35, duration: 6 },
};

export const AI_MODES: Array<{ id: AiMode; label: string }> = [
  { id: "browser", label: "Local Browser AI" },
  { id: "api", label: "Bring Your Own API" },
  { id: "chatgpt", label: "ChatGPT Handoff" },
  { id: "claude", label: "Claude Handoff" },
  { id: "off", label: "AI Off" },
];

export const QUICK_ACTIONS = {
  cpf: [
    { id: "max-topup", label: "Max top-up allowed" },
    { id: "remaining-ers", label: "Fill remaining ERS room" },
    { id: "basic-gap", label: "Min top-up to hit basic needs" },
    { id: "discretionary-gap", label: "Min top-up to hit total spend" },
    { id: "ma-cap", label: "Set MA to BHS cap" },
  ],
  family: [
    { id: "tax-efficient", label: "Allocate for max tax savings" },
    { id: "payout-efficient", label: "Allocate for max parent payout" },
    { id: "split-evenly", label: "Split child top-ups evenly" },
  ],
  medical: [
    { id: "public", label: "Assume public care" },
    { id: "private", label: "Assume private care" },
    { id: "insured", label: "Use insurance-default scenario" },
    { id: "downside", label: "Use conservative downside" },
  ],
  emergency: [
    { id: "buffer-min", label: "Set minimum reserve" },
    { id: "buffer-balanced", label: "Set balanced reserve" },
    { id: "buffer-conservative", label: "Set conservative reserve" },
  ],
} as const;

const defaultCpfPlan: CpfPlanType = "escalating";

export const DEFAULT_PROFILE: {
  name: string;
  profile: ProfileRecord["profile"];
  plans: Omit<PlanData, "id" | "profileId">[];
} = {
  name: "Mom",
  profile: {
    birthDate: "1964-01-15",
    sex: "female",
    heightCm: 155,
    weightKg: 58,
    smoking: "never",
    alcohol: "none",
    exerciseLevel: "moderate",
    selfRatedHealth: "fair",
    chronicConditions: ["hypertension"],
    priorSeriousConditions: [],
    medications: "Amlodipine",
    frailty: "prefrail",
    cognition: "normal",
    mobility: "independent",
    familyLongevity: "mixed",
    bankCash: 200000,
    oa: 114029,
    sa: 0,
    ra: 227688,
    ma: 77115,
    cpfInvestments: 27225,
    cpfInvestmentReturnPct: 6,
    marketAssets: 70000,
    marketIncomeAnnual: 2000,
    basicSpendMonthly: 2000,
    discretionarySpendAnnual: 9000,
    observedCpfPayout: 960,
    observedCpfPlan: defaultCpfPlan,
    propertyPledge: false,
    cpfCohortYear: getCurrentPolicyYear(),
    insurance: {
      carePreference: "public",
      medishield: true,
      shieldProvider: "AIA",
      shieldPlan: "HealthShield Gold Max A",
      rider: true,
      accidentPolicy: false,
      longTermCareCover: "careshield",
      exclusions: "",
    },
    familyContributors: [
      { name: "Child 1", marginalTaxRate: 0.11, amount: 8000, cadence: "annual", activeYears: 20 },
    ],
  },
  plans: [
    {
      name: "Current plan",
      cpfPlan: defaultCpfPlan,
      payoutStartAge: 65,
      recurringTopupAnnual: 8000,
      oneOffTopup: 0,
      topupSource: "cash",
      childSupportStrategy: "tax-efficient",
      medicalScenario: "insurance-default",
      careSetting: "public",
      monthlySupport: 500,
      fixedIncomeAllocationPct: 20,
      equityAllocationPct: 35,
      objective: "basic-certainty",
      emergencyStyle: "balanced",
      discretionaryStyle: "balanced",
      interventions: {
        smokingCessation: false,
        exerciseUpgrade: true,
        weightLoss: false,
        bpControl: true,
        diabetesControl: false,
        sleepTreatment: false,
      },
      notes: "Seed plan calibrated to observed escalating payout.",
    },
  ],
};

export const CREATE_PROFILE_NAME = (existing: number): string => `Profile ${existing + 1}`;
export const CREATE_PLAN_NAME = (existing: number): string => `Plan ${existing + 1}`;

export const APPENDIX_PRESETS: Array<{ id: AppendixPreset; label: string }> = [
  { id: "full", label: "Full ledger" },
  { id: "cpf", label: "CPF only" },
  { id: "medical", label: "Medical only" },
  { id: "family", label: "Family & tax" },
];

export const CHART_IDS = ["incomeSpend", "assetCpf", "survivalFit", "actionImpact"] as const;
