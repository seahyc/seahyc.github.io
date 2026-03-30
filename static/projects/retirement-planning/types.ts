export type Sex = "female" | "male";
export type SmokingStatus = "never" | "former" | "current";
export type ExerciseLevel = "low" | "moderate" | "high";
export type RatedHealth = "poor" | "fair" | "good";
export type FrailtyState = "robust" | "prefrail" | "frail";
export type CarePreference = "public" | "mixed" | "private";
export type CpfPlanType = "standard" | "escalating" | "basic";
export type PlanObjective = "basic-certainty" | "total-spend" | "bequest" | "tax-efficient";
export type ChildSupportStrategy = "tax-efficient" | "payout-efficient" | "split-evenly";
export type MedicalScenario = "insurance-default" | "conservative-downside" | "private-stress";
export type EmergencyStyle = "minimum" | "balanced" | "conservative";
export type AiMode = "browser" | "api" | "chatgpt" | "claude" | "off";
export type AppendixPreset = "full" | "cpf" | "medical" | "family";

export interface CpfPolicySource {
  id: string;
  label: string;
  url: string;
}

export interface CpfPolicyResolution {
  year: number;
  sourceIds: string[];
  note?: string;
}

export interface DestinationCost {
  label: string;
  airfare: number;
  hotelPerNight: number;
  dailySpend: number;
  insurance: number;
  duration: number;
}

export interface FamilyContributor {
  name: string;
  marginalTaxRate: number;
  amount: number;
  cadence: string;
  activeYears: number;
}

export interface InsuranceProfile {
  carePreference: CarePreference;
  medishield: boolean;
  shieldProvider: string;
  shieldPlan: string;
  rider: boolean;
  accidentPolicy: boolean;
  longTermCareCover: string;
  exclusions: string;
}

export interface ProfileData {
  birthDate: string;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  smoking: SmokingStatus;
  alcohol: string;
  exerciseLevel: ExerciseLevel;
  selfRatedHealth: RatedHealth;
  chronicConditions: string[];
  priorSeriousConditions: string[];
  medications: string;
  frailty: FrailtyState;
  cognition: string;
  mobility: string;
  familyLongevity: string;
  bankCash: number;
  oa: number;
  sa: number;
  ra: number;
  ma: number;
  cpfInvestments: number;
  cpfInvestmentReturnPct: number;
  marketAssets: number;
  marketIncomeAnnual: number;
  basicSpendMonthly: number;
  discretionarySpendAnnual: number;
  observedCpfPayout: number;
  observedCpfPlan: CpfPlanType;
  propertyPledge: boolean;
  cpfCohortYear: number;
  insurance: InsuranceProfile;
  familyContributors: FamilyContributor[];
}

export interface PlanInterventions {
  smokingCessation: boolean;
  exerciseUpgrade: boolean;
  weightLoss: boolean;
  bpControl: boolean;
  diabetesControl: boolean;
  sleepTreatment: boolean;
}

export interface PlanData {
  id: string;
  profileId: string;
  name: string;
  cpfPlan: CpfPlanType;
  payoutStartAge: number;
  recurringTopupAnnual: number;
  oneOffTopup: number;
  topupSource: string;
  childSupportStrategy: ChildSupportStrategy;
  medicalScenario: MedicalScenario;
  careSetting: CarePreference;
  monthlySupport: number;
  fixedIncomeAllocationPct: number;
  equityAllocationPct: number;
  objective: PlanObjective;
  emergencyStyle: EmergencyStyle;
  discretionaryStyle: string;
  interventions: PlanInterventions;
  notes: string;
  createdAt?: string;
}

export interface ProfileRecord {
  id: string;
  name: string;
  profile: ProfileData;
  createdAt: string;
}

export interface UiState {
  mode: string;
  appendixPreset: AppendixPreset;
  aiMode: AiMode;
  selectedGraphPlanIds: string[];
  inspectorOpen: boolean;
  chartHiddenSeries: Record<string, string[]>;
}

export interface AppState {
  version: number;
  activeProfileId: string | null;
  activePlanId: string | null;
  ui: UiState;
  profiles: ProfileRecord[];
  plans: PlanData[];
  aiWorkspaces: unknown[];
}

export interface ConstraintSet {
  year: number;
  policySourceIds?: string[];
  policyNote?: string;
  remainingErsRoom: number;
  bhs: number;
  frs: number;
  brs: number;
  ers: number;
  maOverflow: number;
  topupCashCap: number;
  totalTopupRoom: number;
  payoutAgeValid: boolean;
}

export interface ValidationResult {
  issues: string[];
  constraints: ConstraintSet;
}

export interface AiCapabilities {
  browser: boolean;
  api: boolean;
  chatgpt: boolean;
  claude: boolean;
}

export interface ChartSeries {
  label: string;
  color: string;
  data: number[];
  dashed?: boolean;
}

export interface ChartConfig {
  labels: Array<number | string>;
  series: ChartSeries[];
}

export interface Recommendation {
  title: string;
  tag: string;
  risk: string;
  confidence: string;
  why: string;
  shortfallReduction: number;
  liquidityImpact: number;
  estateImpact: number;
}

export interface PanelInsight {
  title: string;
  summary: string;
}

export interface LifestyleEquivalent {
  label: string;
  trips: number;
}

export interface FamilyTopupModel {
  allowedTopup?: number;
  modeledTaxSaved: number;
}

export interface InterventionSummary {
  label: string;
  longevityDelta: number;
  costDelta: number;
}

export interface CashflowRow {
  age: number;
  yearOffset: number;
  policyYear?: number;
  policySourceIds?: string[];
  policyNote?: string | undefined;
  survival: number;
  mortalityState: string;
  bank: number;
  oa: number;
  sa?: number;
  ra: number;
  ma: number;
  cpfInvestments: number;
  premiumEquivalent: number;
  payoutAnnual: number;
  cpfPayoutAnnual?: number;
  cumulativePayouts: number;
  basicSpendAnnual: number;
  discretionaryAnnual: number;
  medicalGross: number;
  insurerPaid: number;
  medisavePaid: number;
  medicalCash: number;
  emergencyExpected: number;
  emergencyMinimum: number;
  emergencyBalanced: number;
  emergencyConservative: number;
  totalSpendAnnual: number;
  grossIncomeAnnual: number;
  netAnnual: number;
  liquidAssets: number;
  estateEquivalent: number;
  taxSavingsAnnual: number;
  supportAnnual?: number;
  familyTopup?: number;
  ownTopup?: number;
  extraInterestTotal?: number;
  oaInterest?: number;
  saInterest?: number;
  raInterest?: number;
  maInterest?: number;
  maOverflow?: number;
  maOverflowToRa?: number;
  maOverflowToSa?: number;
  maOverflowToOa?: number;
  payoutDeductionAnnual?: number;
  raPayoutDeduction?: number;
  ers?: number;
  frs?: number;
  bhs?: number;
  basicCoverage: boolean;
  totalCoverage: boolean;
  [key: string]: unknown;
}

export interface FrailtySummary {
  state: FrailtyState;
  annualMedicalLoadMultiplier: number;
  annualMortalityMultiplier: number;
}

export interface PlanRunResult {
  currentAge: number;
  policyTrace?: CpfPolicyResolution[];
  frailty: FrailtySummary;
  constraints: ConstraintSet;
  familyTopups: FamilyTopupModel[];
  interventions: InterventionSummary[];
  remainingYears: number;
  modalAge: number;
  medianAge: number;
  p75Age: number;
  p90Age: number;
  cpfInitialPayout: number;
  principalCrossoverAge: number | null;
  rows: CashflowRow[];
  lifestyle: LifestyleEquivalent[];
  emergencyGap: number;
  confidence: string;
}

export interface PlanBundle {
  plan: PlanData;
  result: PlanRunResult;
  recommendations: Recommendation[];
  panel: PanelInsight[];
  appendix: CashflowRow[];
}

export interface InsuranceDbSource {
  id: string;
  provider?: string;
  title?: string;
  label?: string;
  url: string;
  kind?: string;
  localPath?: string;
}

export interface InsurancePlanRecord {
  sourceId?: string;
  plans: Record<string, unknown>;
}

export interface InsuranceDb {
  generatedAt?: string;
  sources: InsuranceDbSource[];
  publicSchemes?: Record<string, unknown>;
  insurers: Record<string, InsurancePlanRecord>;
}

export interface DiseaseRecurrencePoint {
  year?: number;
  yearsSince?: number;
  recurrenceWeight: number;
}

export interface DiseaseClaimSensitivity {
  panel: number;
  preAuth: number;
  cancerDrugList: number;
  deductibleWaiver: number;
}

export interface DiseaseClaimsPathway {
  surveillanceCadenceMonths?: number;
  recurrenceWindowYears?: number;
  recurrenceIntensity?: number;
  pathBias?: Record<string, number>;
  claimSensitivity?: DiseaseClaimSensitivity;
}

export interface DiseaseProfile {
  key: string;
  label: string;
  category: string;
  mortalityMultiplier: number;
  chronicCostAnnual: number;
  hospitalizationMultiplier: number;
  emergencyMedicalWeight: number;
  surveillanceCostAnnual: number;
  recurrenceWeightByYears: DiseaseRecurrencePoint[];
  treatmentMix: Record<string, number>;
  claimsPathway: DiseaseClaimsPathway;
  aliases: string[];
}

export interface ParsedDisease {
  key: string;
  profile: DiseaseProfile;
}
