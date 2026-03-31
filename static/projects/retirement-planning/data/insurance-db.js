export const INSURANCE_SOURCE_MANIFEST = [
    {
        id: "moh-compare",
        provider: "MOH",
        label: "Comparison of Integrated Shield Plans",
        url: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/integrated-shield-plans/comparision-of-integrated-shield-plans/",
        kind: "html",
    },
    {
        id: "moh-medishield",
        provider: "MOH",
        label: "MediShield Life",
        url: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/medishield-life/medishield-life",
        kind: "html",
    },
    {
        id: "aia-hsgm",
        provider: "AIA",
        label: "AIA HealthShield Gold Max brochure",
        url: "https://www.aia.com.sg/content/dam/sg/en/docs/product_brochures/medical-protection/aia-health-shield-gold-max-english-brochure.pdf",
        kind: "pdf",
    },
    {
        id: "prudential-prushield",
        provider: "Prudential",
        label: "PRUShield brochure",
        url: "https://www.prudential.com.sg/-/media/project/prudential/pdf/ebrochures/prushield/prushield-ebrochure-english.pdf",
        kind: "pdf",
    },
    {
        id: "income-eis",
        provider: "Income",
        label: "Enhanced IncomeShield brochure",
        url: "https://www.income.com.sg/getContentAsset/68644221-6584-49bb-b76f-7af9146f416d/05c6012c-3879-4f1c-b994-00e61e65c363/Health_Enhanced-IncomeShield_Brochure_ENG.pdf?language=en",
        kind: "pdf",
    },
    {
        id: "singlife-shield",
        provider: "Singlife",
        label: "Singlife Shield & Health Plus brochure",
        url: "https://singlife.com/content/dam/public/sg/documents/medical-insurance/singlife-shield/singlife-health-plus-and-singlife-shield-brochure.pdf",
        kind: "pdf",
    },
    {
        id: "raffles-shield",
        provider: "Raffles",
        label: "Raffles Shield overview",
        url: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/integrated-shield-plans/comparision-of-integrated-shield-plans/",
        kind: "html",
    },
    {
        id: "hsbc-shield",
        provider: "HSBC Life",
        label: "HSBC Life Shield overview",
        url: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/integrated-shield-plans/comparision-of-integrated-shield-plans/",
        kind: "html",
    },
];
const COMMON_COVERAGE = {
    standard: { deductible: 3500, coinsurance: 0.1, annualLimit: 150000, riderCap: 6000, targetCoverage: "Public hospital B1" },
    b1: { deductible: 2500, coinsurance: 0.1, annualLimit: 250000, riderCap: 6000, targetCoverage: "Public hospital B1" },
    a: { deductible: 3500, coinsurance: 0.1, annualLimit: 400000, riderCap: 6000, targetCoverage: "Public hospital A" },
    private: { deductible: 3500, coinsurance: 0.1, annualLimit: 800000, riderCap: 6000, targetCoverage: "Private hospital" },
};
function withSource(base, sourceId, overrides = {}) {
    return {
        nonPanelCoveragePenalty: 0.78,
        preAuthorisationFailurePenalty: 0.86,
        letterOfGuaranteeStrength: "standard",
        panelStrength: "medium",
        cancerDrugListMethod: "blended",
        publicHospitalPreAuthExempt: true,
        emergencyPreAuthExempt: true,
        scheduledTreatmentPreAuthRequired: true,
        claimPathRules: {
            specialistPanelWindowDays: 3,
            outpatientCancerDrugCoverage: "cdl-and-non-cdl",
            preAdmissionWindowDays: 30,
            postDischargeWindowDays: 90,
            extendedPanelAnnualCap: null,
            deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
            riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation", "homeRecovery"],
        },
        ...base,
        sourceId,
        ...overrides,
    };
}
function benefits(overrides = {}) {
    return {
        inpatient: { coveragePct: 0.9, panelBoost: 1, annualCap: null },
        daySurgery: { coveragePct: 0.9, panelBoost: 1, annualCap: null },
        outpatientCancerDrug: { coveragePct: 0.75, panelBoost: 1, annualCap: 50000 },
        outpatientCancerNonDrug: { coveragePct: 0.75, panelBoost: 1, annualCap: 30000 },
        chronicSpecialist: { coveragePct: 0.45, panelBoost: 1, annualCap: 8000 },
        emergencyAccident: { coveragePct: 0.78, panelBoost: 1, annualCap: 25000 },
        rehabilitation: { coveragePct: 0.35, panelBoost: 1, annualCap: 12000 },
        homeRecovery: { coveragePct: 0.2, panelBoost: 1, annualCap: 6000 },
        mentalHealthInpatient: { coveragePct: 0.55, panelBoost: 1, annualCap: 15000 },
        longTermCare: { coveragePct: 0.12, panelBoost: 1, annualCap: 10000 },
        ...overrides,
    };
}
function inferWardTier(label) {
    if (/standard/i.test(label))
        return "public";
    if (/\bB\b|Lite|Basic/i.test(label))
        return "b1";
    if (/\bA\b|Advantage|Plus|Plan 2/i.test(label) && !/Private|Premier|Preferred|Plan 1/.test(label))
        return "a";
    return "private";
}
export const INSURANCE_RIDER_CATALOG = {
    public: [
        {
            id: "none",
            label: "No rider",
            sku: "PUBLIC-RIDER-NONE",
            effectiveFrom: "2015-11-01",
            sourceRefs: ["moh-medishield"],
            compatibility: { wardTiers: ["public"], claimPathTags: ["public-baseline"] },
        },
    ],
    AIA: [
        { id: "none", label: "No rider", sku: "AIA-RIDER-NONE", effectiveFrom: "2018-01-01", sourceRefs: ["aia-hsgm"], compatibility: { planFamilies: ["HealthShield Gold Max"], claimPathTags: ["no-rider"] } },
        { id: "max-vitalhealth-a", label: "MAX VitalHealth A", sku: "AIA-MVH-A", riderCoverage: 0.82, riderCopayPct: 0.05, riderCopayCapAnnual: 3000, stopLossAnnual: 3000, preferredProviderFactor: 0.91, outpatientCancerMultiplier: 1.24, effectiveFrom: "2021-04-01", sourceRefs: ["aia-hsgm"], compatibility: { planFamilies: ["HealthShield Gold Max"], wardTiers: ["private", "a"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider", "panel-first"] }, claimPathTags: ["copay-rider", "panel-first"] },
        { id: "max-vitalhealth-b", label: "MAX VitalHealth B", sku: "AIA-MVH-B", riderCoverage: 0.78, riderCopayPct: 0.05, riderCopayCapAnnual: 3500, stopLossAnnual: 3500, preferredProviderFactor: 0.9, outpatientCancerMultiplier: 1.18, effectiveFrom: "2021-04-01", sourceRefs: ["aia-hsgm"], compatibility: { planFamilies: ["HealthShield Gold Max"], wardTiers: ["b1", "a"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider"] }, claimPathTags: ["copay-rider"] },
    ],
    "Great Eastern": [
        { id: "none", label: "No rider", sku: "GE-RIDER-NONE", effectiveFrom: "2018-01-01", sourceRefs: ["moh-compare"], compatibility: { planFamilies: ["GREAT SupremeHealth"], claimPathTags: ["no-rider"] } },
        { id: "totalcare-classic", label: "GREAT TotalCare Classic", sku: "GE-TC-CLASSIC", riderCoverage: 0.8, riderCopayPct: 0.05, riderCopayCapAnnual: 3000, stopLossAnnual: 3000, preferredProviderFactor: 0.92, outpatientCancerMultiplier: 1.12, effectiveFrom: "2021-01-01", sourceRefs: ["moh-compare"], compatibility: { planFamilies: ["GREAT SupremeHealth"], wardTiers: ["b1", "a", "private"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider", "panel-first"] }, claimPathTags: ["copay-rider", "panel-first"] },
        { id: "totalcare-elite", label: "GREAT TotalCare Elite", sku: "GE-TC-ELITE", riderCoverage: 0.84, riderCopayPct: 0.05, riderCopayCapAnnual: 2500, stopLossAnnual: 2500, preferredProviderFactor: 0.93, outpatientCancerMultiplier: 1.16, effectiveFrom: "2021-01-01", sourceRefs: ["moh-compare"], compatibility: { planFamilies: ["GREAT SupremeHealth"], wardTiers: ["private", "a"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider", "elite"] }, claimPathTags: ["copay-rider", "elite"] },
    ],
    Prudential: [
        { id: "none", label: "No rider", sku: "PRU-RIDER-NONE", effectiveFrom: "2018-01-01", sourceRefs: ["prudential-prushield"], compatibility: { planFamilies: ["PRUShield"], claimPathTags: ["no-rider"] } },
        { id: "pruextra-premier-copay", label: "PRUExtra Premier CoPay", sku: "PRU-EXTRA-PREMIER-COPAY", riderCoverage: 0.82, riderCopayPct: 0.05, riderCopayCapAnnual: 3000, stopLossAnnual: 3000, preferredProviderFactor: 0.92, outpatientCancerMultiplier: 1.12, effectiveFrom: "2021-04-01", sourceRefs: ["prudential-prushield"], compatibility: { planFamilies: ["PRUShield"], wardTiers: ["a", "private"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider", "panel-first"] }, claimPathTags: ["copay-rider", "panel-first"] },
        { id: "pruextra-plus-copay", label: "PRUExtra Plus CoPay", sku: "PRU-EXTRA-PLUS-COPAY", riderCoverage: 0.78, riderCopayPct: 0.05, riderCopayCapAnnual: 3500, stopLossAnnual: 3500, preferredProviderFactor: 0.91, outpatientCancerMultiplier: 1.08, effectiveFrom: "2021-04-01", sourceRefs: ["prudential-prushield"], compatibility: { planFamilies: ["PRUShield"], wardTiers: ["a", "private"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider"] }, claimPathTags: ["copay-rider"] },
    ],
    Income: [
        { id: "none", label: "No rider", sku: "INCOME-RIDER-NONE", effectiveFrom: "2018-01-01", sourceRefs: ["income-eis"], compatibility: { planFamilies: ["Enhanced IncomeShield"], claimPathTags: ["no-rider"] } },
        { id: "deluxe-care", label: "Deluxe Care Rider", sku: "INCOME-DELUXE-CARE", riderCoverage: 0.8, riderCopayPct: 0.05, riderCopayCapAnnual: 3000, stopLossAnnual: 3000, preferredProviderFactor: 0.92, outpatientCancerMultiplier: 1.22, effectiveFrom: "2021-04-01", sourceRefs: ["income-eis"], compatibility: { planFamilies: ["Enhanced IncomeShield"], wardTiers: ["a", "private"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider", "extended-panel"] }, claimPathTags: ["copay-rider", "extended-panel"] },
        { id: "classic-care", label: "Classic Care Rider", sku: "INCOME-CLASSIC-CARE", riderCoverage: 0.75, riderCopayPct: 0.1, riderCopayCapAnnual: 4000, stopLossAnnual: 4000, preferredProviderFactor: 0.9, outpatientCancerMultiplier: 1.12, effectiveFrom: "2021-04-01", sourceRefs: ["income-eis"], compatibility: { planFamilies: ["Enhanced IncomeShield"], wardTiers: ["b1", "a"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider"] }, claimPathTags: ["copay-rider"] },
    ],
    Singlife: [
        { id: "none", label: "No rider", sku: "SINGLIFE-RIDER-NONE", effectiveFrom: "2020-01-01", sourceRefs: ["singlife-shield"], compatibility: { planFamilies: ["Singlife Shield"], claimPathTags: ["no-rider"] } },
        { id: "health-plus-public", label: "Health Plus Public", sku: "SINGLIFE-HEALTH-PLUS-PUBLIC", riderCoverage: 0.74, riderCopayPct: 0.05, riderCopayCapAnnual: 3500, stopLossAnnual: 3500, preferredProviderFactor: 0.91, outpatientCancerMultiplier: 1.08, effectiveFrom: "2021-04-01", sourceRefs: ["singlife-shield"], compatibility: { planFamilies: ["Singlife Shield"], wardTiers: ["b1", "a"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider"] }, claimPathTags: ["copay-rider"] },
        { id: "health-plus-private", label: "Health Plus Private", sku: "SINGLIFE-HEALTH-PLUS-PRIVATE", riderCoverage: 0.8, riderCopayPct: 0.05, riderCopayCapAnnual: 3000, stopLossAnnual: 3000, preferredProviderFactor: 0.92, outpatientCancerMultiplier: 1.12, effectiveFrom: "2021-04-01", sourceRefs: ["singlife-shield"], compatibility: { planFamilies: ["Singlife Shield"], wardTiers: ["a", "private"], requiresPanel: true, requiresPreAuthorisation: true, claimPathTags: ["copay-rider", "private"] }, claimPathTags: ["copay-rider", "private"] },
    ],
    "HSBC Life": [
        { id: "none", label: "No rider", sku: "HSBC-RIDER-NONE", effectiveFrom: "2022-01-01", sourceRefs: ["hsbc-shield"], compatibility: { planFamilies: ["HSBC Life Shield"], claimPathTags: ["no-rider"] } },
        { id: "life-enhancer", label: "Life Enhancer Rider", sku: "HSBC-LIFE-ENHANCER", riderCoverage: 0.76, riderCopayPct: 0.05, riderCopayCapAnnual: 3500, stopLossAnnual: 3500, preferredProviderFactor: 0.91, outpatientCancerMultiplier: 1.08, effectiveFrom: "2022-01-01", sourceRefs: ["hsbc-shield"], compatibility: { planFamilies: ["HSBC Life Shield"], wardTiers: ["a", "private"], requiresPanel: true, claimPathTags: ["copay-rider"] }, claimPathTags: ["copay-rider"] },
    ],
    Raffles: [
        { id: "none", label: "No rider", sku: "RAFFLES-RIDER-NONE", effectiveFrom: "2023-01-01", sourceRefs: ["raffles-shield"], compatibility: { planFamilies: ["Raffles Shield"], claimPathTags: ["no-rider"] } },
        { id: "raffles-rider", label: "Raffles Shield Rider", sku: "RAFFLES-SHIELD-RIDER", riderCoverage: 0.76, riderCopayPct: 0.05, riderCopayCapAnnual: 3500, stopLossAnnual: 3500, preferredProviderFactor: 0.91, outpatientCancerMultiplier: 1.08, effectiveFrom: "2023-01-01", sourceRefs: ["raffles-shield"], compatibility: { planFamilies: ["Raffles Shield"], wardTiers: ["a", "private"], requiresPanel: true, claimPathTags: ["copay-rider"] }, claimPathTags: ["copay-rider"] },
    ],
};
export const UNIFIED_INSURANCE_DB = {
    generatedAt: "2026-03-30",
    sources: INSURANCE_SOURCE_MANIFEST,
    publicSchemes: {
        medishieldLife: {
            sourceId: "moh-medishield",
            deductible: 2500,
            coinsurance: 0.1,
            annualLimit: 150000,
            note: "Baseline national scheme for large hospital bills and selected costly outpatient treatments.",
        },
        careShieldLife: {
            sourceId: "moh-medishield",
            payoutMonthly: 662,
            note: "Base monthly payout reference for long-term care modeling.",
        },
    },
    insurers: {
        AIA: {
            sourceId: "aia-hsgm",
            plans: {
                "HealthShield Gold Max A": withSource(COMMON_COVERAGE.private, "aia-hsgm", {
                    riderCoverage: 0.8,
                    preferredProviderFactor: 0.9,
                    panelRequiredForBestTerms: true,
                    preAuthorisationRequiredForBestTerms: true,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    deductibleWaiverEligible: true,
                    deductibleWaiverResetYears: 3,
                    riderCopayPct: 0.05,
                    riderCopayCapAnnual: 3000,
                    outpatientCancerMultiplier: 1.2,
                    nonCdlCancerPenalty: 0.08,
                    panelStrength: "high",
                    claimPathRules: {
                        specialistPanelWindowDays: 3,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 90,
                        extendedPanelAnnualCap: null,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation", "homeRecovery"],
                        emergencyTransportIncluded: true,
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.93, panelBoost: 1.04, annualCap: 800000 },
                        outpatientCancerDrug: { coveragePct: 0.84, panelBoost: 1.02, annualCap: 90000 },
                        outpatientCancerNonDrug: { coveragePct: 0.78, panelBoost: 1.02, annualCap: 50000 },
                        chronicSpecialist: { coveragePct: 0.5, panelBoost: 1.02, annualCap: 12000 },
                        rehabilitation: { coveragePct: 0.42, panelBoost: 1.02, annualCap: 18000 },
                    }),
                }),
                "HealthShield Gold Max B": withSource(COMMON_COVERAGE.a, "aia-hsgm", {
                    riderCoverage: 0.8,
                    preferredProviderFactor: 0.92,
                    panelRequiredForBestTerms: true,
                    preAuthorisationRequiredForBestTerms: true,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    deductibleWaiverEligible: true,
                    riderCopayPct: 0.05,
                    riderCopayCapAnnual: 3000,
                    outpatientCancerMultiplier: 1.15,
                    nonCdlCancerPenalty: 0.1,
                    panelStrength: "high",
                    claimPathRules: {
                        specialistPanelWindowDays: 3,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 90,
                        extendedPanelAnnualCap: null,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation"],
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.92, panelBoost: 1.03, annualCap: 500000 },
                        outpatientCancerDrug: { coveragePct: 0.82, panelBoost: 1.02, annualCap: 70000 },
                        chronicSpecialist: { coveragePct: 0.48, panelBoost: 1.01, annualCap: 10000 },
                    }),
                }),
                "HealthShield Gold Max B Lite": withSource(COMMON_COVERAGE.b1, "aia-hsgm", {
                    riderCoverage: 0.75,
                    preferredProviderFactor: 0.95,
                    panelRequiredForBestTerms: false,
                    preAuthorisationRequiredForBestTerms: true,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    riderCopayPct: 0.05,
                    riderCopayCapAnnual: 3000,
                    outpatientCancerMultiplier: 1.05,
                    nonCdlCancerPenalty: 0.12,
                    panelStrength: "medium",
                    claimPathRules: {
                        specialistPanelWindowDays: 5,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 60,
                        extendedPanelAnnualCap: 12000,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery"],
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.9, panelBoost: 1.01, annualCap: 300000 },
                        outpatientCancerDrug: { coveragePct: 0.72, panelBoost: 1, annualCap: 45000 },
                        chronicSpecialist: { coveragePct: 0.42, panelBoost: 1, annualCap: 8000 },
                    }),
                }),
                "HealthShield Gold Max Standard": withSource(COMMON_COVERAGE.standard, "aia-hsgm", {
                    riderCoverage: 0.7,
                    panelRequiredForBestTerms: false,
                    preAuthorisationRequiredForBestTerms: false,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    outpatientCancerMultiplier: 1,
                    nonCdlCancerPenalty: 0.18,
                    panelStrength: "medium",
                    claimPathRules: {
                        specialistPanelWindowDays: 7,
                        outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl",
                        preAdmissionWindowDays: 21,
                        postDischargeWindowDays: 60,
                        extendedPanelAnnualCap: 8000,
                        deductibleWaiverAppliesTo: ["inpatient"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery"],
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 },
                        outpatientCancerDrug: { coveragePct: 0.6, panelBoost: 1, annualCap: 25000 },
                        chronicSpecialist: { coveragePct: 0.28, panelBoost: 1, annualCap: 4000 },
                    }),
                }),
            },
        },
        "Great Eastern": {
            sourceId: "moh-compare",
            plans: {
                "GREAT SupremeHealth P Plus": withSource(COMMON_COVERAGE.private, "moh-compare", { riderCoverage: 0.8, preferredProviderFactor: 0.9, panelRequiredForBestTerms: true, preAuthorisationRequiredForBestTerms: true, benefits: benefits({ inpatient: { coveragePct: 0.92, panelBoost: 1.03, annualCap: 750000 }, outpatientCancerDrug: { coveragePct: 0.8, panelBoost: 1.01, annualCap: 85000 } }), claimPathRules: { specialistPanelWindowDays: 3, outpatientCancerDrugCoverage: "cdl-and-non-cdl", preAdmissionWindowDays: 30, postDischargeWindowDays: 90, extendedPanelAnnualCap: null } }),
                "GREAT SupremeHealth A Plus": withSource(COMMON_COVERAGE.a, "moh-compare", { riderCoverage: 0.78, preferredProviderFactor: 0.92, panelRequiredForBestTerms: true, preAuthorisationRequiredForBestTerms: true, benefits: benefits({ inpatient: { coveragePct: 0.9, panelBoost: 1.02, annualCap: 450000 }, outpatientCancerDrug: { coveragePct: 0.76, panelBoost: 1.01, annualCap: 65000 } }), claimPathRules: { specialistPanelWindowDays: 3, outpatientCancerDrugCoverage: "cdl-and-non-cdl", preAdmissionWindowDays: 30, postDischargeWindowDays: 90, extendedPanelAnnualCap: 18000 } }),
                "GREAT SupremeHealth B Plus": withSource(COMMON_COVERAGE.b1, "moh-compare", { riderCoverage: 0.74, preferredProviderFactor: 0.95, panelRequiredForBestTerms: false, preAuthorisationRequiredForBestTerms: true, benefits: benefits({ inpatient: { coveragePct: 0.88, panelBoost: 1.01, annualCap: 280000 }, outpatientCancerDrug: { coveragePct: 0.68, panelBoost: 1, annualCap: 42000 } }), claimPathRules: { specialistPanelWindowDays: 5, outpatientCancerDrugCoverage: "cdl-and-non-cdl", preAdmissionWindowDays: 21, postDischargeWindowDays: 60, extendedPanelAnnualCap: 12000 } }),
                "GREAT SupremeHealth Standard": withSource(COMMON_COVERAGE.standard, "moh-compare", { riderCoverage: 0.68, preAuthorisationRequiredForBestTerms: false, benefits: benefits({ inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 } }), claimPathRules: { specialistPanelWindowDays: 7, outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl", preAdmissionWindowDays: 21, postDischargeWindowDays: 45, extendedPanelAnnualCap: 8000 } }),
            },
        },
        Prudential: {
            sourceId: "prudential-prushield",
            plans: {
                "PRUShield Premier": withSource(COMMON_COVERAGE.private, "prudential-prushield", {
                    riderCoverage: 0.8,
                    preferredProviderFactor: 0.9,
                    panelRequiredForBestTerms: true,
                    stopLossAnnual: 3000,
                    deductibleCoveragePct: 0.95,
                    coinsuranceCoveragePct: 0.5,
                    outpatientCancerMultiplier: 1.1,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    nonCdlCancerPenalty: 0.1,
                    panelStrength: "high",
                    claimPathRules: {
                        specialistPanelWindowDays: 3,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 90,
                        extendedPanelAnnualCap: null,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation", "homeRecovery"],
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.94, panelBoost: 1.04, annualCap: 2000000 },
                        outpatientCancerDrug: { coveragePct: 0.82, panelBoost: 1.02, annualCap: 90000 },
                        chronicSpecialist: { coveragePct: 0.52, panelBoost: 1.01, annualCap: 12000 },
                        emergencyAccident: { coveragePct: 0.84, panelBoost: 1.02, annualCap: 35000 },
                    }),
                }),
                "PRUShield Plus": withSource(COMMON_COVERAGE.a, "prudential-prushield", {
                    riderCoverage: 0.78,
                    preferredProviderFactor: 0.92,
                    panelRequiredForBestTerms: true,
                    stopLossAnnual: 3000,
                    deductibleCoveragePct: 0.95,
                    coinsuranceCoveragePct: 0.5,
                    outpatientCancerMultiplier: 1.06,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    nonCdlCancerPenalty: 0.12,
                    panelStrength: "high",
                    claimPathRules: {
                        specialistPanelWindowDays: 3,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 90,
                        extendedPanelAnnualCap: null,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation"],
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.92, panelBoost: 1.03, annualCap: 450000 },
                        outpatientCancerDrug: { coveragePct: 0.78, panelBoost: 1.01, annualCap: 70000 },
                        chronicSpecialist: { coveragePct: 0.5, panelBoost: 1.01, annualCap: 10000 },
                    }),
                }),
                "PRUShield Standard": withSource(COMMON_COVERAGE.standard, "prudential-prushield", {
                    riderCoverage: 0.68,
                    panelRequiredForBestTerms: false,
                    outpatientCancerMultiplier: 1,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    nonCdlCancerPenalty: 0.16,
                    panelStrength: "medium",
                    claimPathRules: {
                        specialistPanelWindowDays: 7,
                        outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl",
                        preAdmissionWindowDays: 21,
                        postDischargeWindowDays: 60,
                        extendedPanelAnnualCap: 8000,
                        deductibleWaiverAppliesTo: ["inpatient"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery"],
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 },
                        outpatientCancerDrug: { coveragePct: 0.6, panelBoost: 1, annualCap: 25000 },
                    }),
                }),
            },
        },
        Income: {
            sourceId: "income-eis",
            plans: {
                "Enhanced IncomeShield Preferred": withSource(COMMON_COVERAGE.private, "income-eis", {
                    deductible: 3500,
                    riderCoverage: 0.78,
                    preferredProviderFactor: 0.91,
                    riderCopayPct: 0.05,
                    riderStopLossAnnual: 3000,
                    outpatientCancerMultiplier: 1.23,
                    nonCdlCancerPenalty: 0.18,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    panelStrength: "high",
                    claimPathRules: {
                        specialistPanelWindowDays: 3,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 90,
                        extendedPanelAnnualCap: 2000,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation"],
                        useExtendedPanelNetwork: true,
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.93, panelBoost: 1.03, annualCap: 1000000 },
                        outpatientCancerDrug: { coveragePct: 0.88, panelBoost: 1.03, annualCap: 120000 },
                        outpatientCancerNonDrug: { coveragePct: 0.82, panelBoost: 1.02, annualCap: 70000 },
                        chronicSpecialist: { coveragePct: 0.5, panelBoost: 1.01, annualCap: 12000 },
                    }),
                }),
                "Enhanced IncomeShield Advantage": withSource(COMMON_COVERAGE.a, "income-eis", {
                    deductible: 3500,
                    riderCoverage: 0.76,
                    preferredProviderFactor: 0.93,
                    riderCopayPct: 0.05,
                    riderStopLossAnnual: 3000,
                    outpatientCancerMultiplier: 1.18,
                    nonCdlCancerPenalty: 0.14,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    panelStrength: "high",
                    claimPathRules: {
                        specialistPanelWindowDays: 3,
                        outpatientCancerDrugCoverage: "cdl-and-non-cdl",
                        preAdmissionWindowDays: 30,
                        postDischargeWindowDays: 90,
                        extendedPanelAnnualCap: 2000,
                        deductibleWaiverAppliesTo: ["inpatient", "daySurgery"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery", "rehabilitation"],
                        useExtendedPanelNetwork: true,
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.91, panelBoost: 1.02, annualCap: 500000 },
                        outpatientCancerDrug: { coveragePct: 0.84, panelBoost: 1.02, annualCap: 95000 },
                        outpatientCancerNonDrug: { coveragePct: 0.76, panelBoost: 1.01, annualCap: 60000 },
                    }),
                }),
                "Enhanced IncomeShield Basic": withSource(COMMON_COVERAGE.b1, "income-eis", {
                    deductible: 2500,
                    riderCoverage: 0.72,
                    preferredProviderFactor: 0.95,
                    riderCopayPct: 0.1,
                    riderStopLossAnnual: 4000,
                    outpatientCancerMultiplier: 1.08,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    panelStrength: "medium",
                    claimPathRules: {
                        specialistPanelWindowDays: 7,
                        outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl",
                        preAdmissionWindowDays: 21,
                        postDischargeWindowDays: 60,
                        extendedPanelAnnualCap: 1200,
                        deductibleWaiverAppliesTo: ["inpatient"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery"],
                        useExtendedPanelNetwork: false,
                    },
                    benefits: benefits({
                        inpatient: { coveragePct: 0.88, panelBoost: 1.01, annualCap: 300000 },
                        outpatientCancerDrug: { coveragePct: 0.72, panelBoost: 1.01, annualCap: 50000 },
                    }),
                }),
                "IncomeShield Standard Plan": withSource(COMMON_COVERAGE.standard, "income-eis", {
                    riderCoverage: 0.68,
                    outpatientCancerMultiplier: 1,
                    publicHospitalPreAuthExempt: true,
                    emergencyPreAuthExempt: true,
                    panelStrength: "medium",
                    claimPathRules: {
                        specialistPanelWindowDays: 7,
                        outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl",
                        preAdmissionWindowDays: 21,
                        postDischargeWindowDays: 45,
                        extendedPanelAnnualCap: 8000,
                        deductibleWaiverAppliesTo: ["inpatient"],
                        riderCoPayAppliesTo: ["inpatient", "daySurgery"],
                    },
                    benefits: benefits({ inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 } }),
                }),
            },
        },
        Singlife: {
            sourceId: "singlife-shield",
            plans: {
                "Singlife Shield Plan 1": withSource(COMMON_COVERAGE.private, "singlife-shield", { riderCoverage: 0.8, preferredProviderFactor: 0.9, panelStrength: "medium-high", outpatientCancerMultiplier: 1.05, publicHospitalPreAuthExempt: true, emergencyPreAuthExempt: true, nonCdlCancerPenalty: 0.12, claimPathRules: { specialistPanelWindowDays: 5, outpatientCancerDrugCoverage: "cdl-and-non-cdl", preAdmissionWindowDays: 30, postDischargeWindowDays: 90, extendedPanelAnnualCap: null }, benefits: benefits({ inpatient: { coveragePct: 0.92, panelBoost: 1.02, annualCap: 750000 }, outpatientCancerDrug: { coveragePct: 0.76, panelBoost: 1.01, annualCap: 70000 } }) }),
                "Singlife Shield Plan 2": withSource(COMMON_COVERAGE.a, "singlife-shield", { riderCoverage: 0.76, preferredProviderFactor: 0.93, panelStrength: "medium-high", outpatientCancerMultiplier: 1.03, publicHospitalPreAuthExempt: true, emergencyPreAuthExempt: true, nonCdlCancerPenalty: 0.14, claimPathRules: { specialistPanelWindowDays: 5, outpatientCancerDrugCoverage: "cdl-and-non-cdl", preAdmissionWindowDays: 30, postDischargeWindowDays: 90, extendedPanelAnnualCap: 12000 }, benefits: benefits({ inpatient: { coveragePct: 0.9, panelBoost: 1.01, annualCap: 420000 }, outpatientCancerDrug: { coveragePct: 0.72, panelBoost: 1.01, annualCap: 55000 } }) }),
                "Singlife Shield Plan 3": withSource(COMMON_COVERAGE.b1, "singlife-shield", { riderCoverage: 0.72, preferredProviderFactor: 0.95, panelStrength: "medium", outpatientCancerMultiplier: 1.01, publicHospitalPreAuthExempt: true, emergencyPreAuthExempt: true, nonCdlCancerPenalty: 0.16, claimPathRules: { specialistPanelWindowDays: 7, outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl", preAdmissionWindowDays: 21, postDischargeWindowDays: 60, extendedPanelAnnualCap: 10000 }, benefits: benefits({ inpatient: { coveragePct: 0.88, panelBoost: 1.01, annualCap: 260000 }, outpatientCancerDrug: { coveragePct: 0.66, panelBoost: 1, annualCap: 42000 } }) }),
                "Singlife Shield Standard Plan": withSource(COMMON_COVERAGE.standard, "singlife-shield", { riderCoverage: 0.68, panelStrength: "medium", outpatientCancerMultiplier: 1, publicHospitalPreAuthExempt: true, emergencyPreAuthExempt: true, nonCdlCancerPenalty: 0.18, claimPathRules: { specialistPanelWindowDays: 7, outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl", preAdmissionWindowDays: 21, postDischargeWindowDays: 45, extendedPanelAnnualCap: 8000 }, benefits: benefits({ inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 } }) }),
                "Singlife Shield Starter": withSource(COMMON_COVERAGE.private, "singlife-shield", { deductible: 4000, coinsurance: 0.1, riderCoverage: 0.65, preferredProviderFactor: 0.88, panelStrength: "medium", outpatientCancerMultiplier: 1, publicHospitalPreAuthExempt: true, emergencyPreAuthExempt: true, nonCdlCancerPenalty: 0.2, claimPathRules: { specialistPanelWindowDays: 7, outpatientCancerDrugCoverage: "cdl-only-plus-selected-non-cdl", preAdmissionWindowDays: 21, postDischargeWindowDays: 60, extendedPanelAnnualCap: 8000 }, benefits: benefits({ inpatient: { coveragePct: 0.86, panelBoost: 1, annualCap: 500000 }, outpatientCancerDrug: { coveragePct: 0.6, panelBoost: 1, annualCap: 30000 } }) }),
            },
        },
        "HSBC Life": {
            sourceId: "hsbc-shield",
            plans: {
                "HSBC Life Shield Plan A": withSource(COMMON_COVERAGE.private, "hsbc-shield", { riderCoverage: 0.78, preferredProviderFactor: 0.9, panelStrength: "medium", outpatientCancerMultiplier: 1.02, benefits: benefits({ inpatient: { coveragePct: 0.9, panelBoost: 1.01, annualCap: 600000 }, outpatientCancerDrug: { coveragePct: 0.7, panelBoost: 1, annualCap: 50000 } }) }),
                "HSBC Life Shield Plan B": withSource(COMMON_COVERAGE.a, "hsbc-shield", { riderCoverage: 0.74, preferredProviderFactor: 0.93, panelStrength: "medium", outpatientCancerMultiplier: 1.01, benefits: benefits({ inpatient: { coveragePct: 0.88, panelBoost: 1.01, annualCap: 360000 }, outpatientCancerDrug: { coveragePct: 0.66, panelBoost: 1, annualCap: 42000 } }) }),
                "HSBC Life Shield Standard Plan": withSource(COMMON_COVERAGE.standard, "hsbc-shield", { riderCoverage: 0.68, panelStrength: "medium", outpatientCancerMultiplier: 1, benefits: benefits({ inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 } }) }),
            },
        },
        Raffles: {
            sourceId: "raffles-shield",
            plans: {
                "Raffles Shield Private": withSource(COMMON_COVERAGE.private, "raffles-shield", { riderCoverage: 0.76, preferredProviderFactor: 0.91, panelStrength: "medium", outpatientCancerMultiplier: 1.01, benefits: benefits({ inpatient: { coveragePct: 0.89, panelBoost: 1.01, annualCap: 600000 }, outpatientCancerDrug: { coveragePct: 0.68, panelBoost: 1, annualCap: 50000 } }) }),
                "Raffles Shield A": withSource(COMMON_COVERAGE.a, "raffles-shield", { riderCoverage: 0.74, preferredProviderFactor: 0.93, panelStrength: "medium", outpatientCancerMultiplier: 1.01, benefits: benefits({ inpatient: { coveragePct: 0.88, panelBoost: 1.01, annualCap: 360000 }, outpatientCancerDrug: { coveragePct: 0.66, panelBoost: 1, annualCap: 42000 } }) }),
                "Raffles Shield B": withSource(COMMON_COVERAGE.b1, "raffles-shield", { riderCoverage: 0.7, preferredProviderFactor: 0.95, panelStrength: "medium", outpatientCancerMultiplier: 1, benefits: benefits({ inpatient: { coveragePct: 0.86, panelBoost: 1, annualCap: 240000 }, outpatientCancerDrug: { coveragePct: 0.62, panelBoost: 1, annualCap: 35000 } }) }),
                "Raffles Shield Standard Plan": withSource(COMMON_COVERAGE.standard, "raffles-shield", { riderCoverage: 0.66, panelStrength: "medium", outpatientCancerMultiplier: 1, benefits: benefits({ inpatient: { coveragePct: 0.84, panelBoost: 1, annualCap: 150000 } }) }),
            },
        },
    },
};
function buildPlanCatalogEntries(insurers) {
    return Object.entries(insurers).flatMap(([provider, providerRecord]) => Object.entries(providerRecord.plans).map(([planName, plan]) => {
        const wardTier = inferWardTier(planName);
        const compatibleRiders = (INSURANCE_RIDER_CATALOG[provider] || []).filter((item) => {
            const wardTiers = item.compatibility.wardTiers || [];
            return !wardTiers.length || wardTiers.includes(wardTier);
        });
        return {
            skuKind: "plan",
            skuId: `${provider.toUpperCase().replace(/\s+/g, "-")}-${planName.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
            provider,
            displayName: planName,
            planName,
            effectiveFrom: provider === "Raffles" ? "2023-01-01" : provider === "HSBC Life" ? "2022-01-01" : "2021-04-01",
            sourceRefs: [providerRecord.sourceId, plan.sourceId].filter(Boolean),
            compatibility: {
                riderIds: compatibleRiders.map((item) => item.id),
                wardTiers: [wardTier],
                requiresPanel: Boolean(plan.panelRequiredForBestTerms),
                requiresPreAuthorisation: Boolean(plan.preAuthorisationRequiredForBestTerms),
                outpatientCancerCoverage: plan.claimPathRules?.outpatientCancerDrugCoverage || "cdl-and-non-cdl",
                claimPathTags: [
                    plan.panelRequiredForBestTerms ? "panel-first" : "panel-optional",
                    plan.preAuthorisationRequiredForBestTerms ? "preauth-sensitive" : "preauth-light",
                ],
            },
            claimPathTags: [
                plan.panelRequiredForBestTerms ? "panel-first" : "panel-optional",
                plan.preAuthorisationRequiredForBestTerms ? "preauth-sensitive" : "preauth-light",
                wardTier,
            ],
            notes: [
                `Target coverage ${String(plan.targetCoverage || "not specified")}.`,
                plan.annualLimit ? `Annual limit ${plan.annualLimit}.` : "No explicit annual limit encoded.",
            ],
        };
    }));
}
function buildRiderCatalogEntries() {
    return Object.entries(INSURANCE_RIDER_CATALOG).flatMap(([provider, riders]) => riders.map((rider) => ({
        skuKind: "rider",
        skuId: rider.sku,
        provider,
        displayName: rider.label,
        riderId: rider.id,
        riderLabel: rider.label,
        effectiveFrom: rider.effectiveFrom,
        ...(rider.effectiveTo !== undefined ? { effectiveTo: rider.effectiveTo } : {}),
        sourceRefs: rider.sourceRefs,
        compatibility: rider.compatibility,
        claimPathTags: rider.claimPathTags || rider.compatibility.claimPathTags || [],
        ...(rider.notes ? { notes: rider.notes } : {}),
    })));
}
UNIFIED_INSURANCE_DB.catalog = [
    ...buildPlanCatalogEntries(UNIFIED_INSURANCE_DB.insurers),
    ...buildRiderCatalogEntries(),
];
