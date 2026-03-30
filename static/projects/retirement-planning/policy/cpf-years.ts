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

export function getCurrentPolicyYear(): number {
  return new Date().getFullYear();
}

export const CPF_POLICY_SOURCES: Record<number, CpfPolicySource[]> = {
  2025: [
    {
      id: "cpf-retirement-sum-2025",
      label: "CPF retirement sum anchor",
      url: "https://www.cpf.gov.sg/member/infohub/educational-resources/what-is-the-cpf-retirement-sum",
    },
    {
      id: "cpf-life-2025",
      label: "CPF LIFE overview",
      url: "https://www.cpf.gov.sg/member/retirement-income/monthly-payouts/cpf-life",
    },
  ],
  2026: [
    {
      id: "cpf-retirement-sum-2026",
      label: "CPF retirement sum anchor",
      url: "https://www.cpf.gov.sg/member/infohub/educational-resources/what-is-the-cpf-retirement-sum",
    },
    {
      id: "cpf-life-2026",
      label: "CPF LIFE overview",
      url: "https://www.cpf.gov.sg/member/retirement-income/monthly-payouts/cpf-life",
    },
  ],
};

export const CPF_POLICY_BY_YEAR: Record<number, CpfPolicyYear> = {
  2025: { brs: 106500, frs: 213000, ers: 426000, bhs: 75500, year: 2025, sources: [...(CPF_POLICY_SOURCES[2025] ?? [])], note: "Published CPF retirement sum anchors used for current planning." },
  2026: { brs: 110200, frs: 220400, ers: 440800, bhs: 79000, year: 2026, sources: [...(CPF_POLICY_SOURCES[2026] ?? [])], note: "Current browser/runtime year anchor for this planner session." },
};

const GROWTH_ASSUMPTIONS = {
  brs: 1.0347,
  frs: 1.0347,
  ers: 1.0347,
  bhs: 1.0464,
} as const;

export function resolveCpfYear(year: number): CpfPolicyYear {
  const exactPolicy = CPF_POLICY_BY_YEAR[year];
  if (exactPolicy) {
    const sources = exactPolicy.sources ?? CPF_POLICY_SOURCES[year] ?? [];
    return { ...exactPolicy, year, sources: [...sources] };
  }
  const knownYears = Object.keys(CPF_POLICY_BY_YEAR).map(Number).sort((a, b) => a - b);
  const baseYear = knownYears.at(-1) ?? getCurrentPolicyYear();
  const basePolicy = CPF_POLICY_BY_YEAR[baseYear] ?? CPF_POLICY_BY_YEAR[getCurrentPolicyYear()] ?? Object.values(CPF_POLICY_BY_YEAR)[0];
  if (!basePolicy) {
    return { brs: 0, frs: 0, ers: 0, bhs: 0, year, sources: [], note: "No CPF policy anchors available." };
  }
  if (year <= baseYear) {
    const sources = basePolicy.sources ?? CPF_POLICY_SOURCES[baseYear] ?? [];
    return {
      ...basePolicy,
      year: baseYear,
      sources: [...sources],
      note: basePolicy.note ?? "Resolved from nearest available CPF policy year.",
    };
  }
  let current: CpfPolicyYear = { ...basePolicy };
  for (let currentYear = baseYear + 1; currentYear <= year; currentYear += 1) {
    current = {
      brs: roundCpf(current.brs * GROWTH_ASSUMPTIONS.brs),
      frs: roundCpf(current.frs * GROWTH_ASSUMPTIONS.frs),
      ers: roundCpf(current.ers * GROWTH_ASSUMPTIONS.ers),
      bhs: roundCpf(current.bhs * GROWTH_ASSUMPTIONS.bhs),
    };
  }
  return {
    ...current,
    year,
    sources: [...(basePolicy.sources ?? CPF_POLICY_SOURCES[baseYear] ?? [])],
    note: `Derived from ${baseYear} policy anchors using rounded annual growth assumptions.`,
  };
}

export function resolveCpfPolicyTrace(year: number): CpfPolicyResolution[] {
  const resolved = resolveCpfYear(year);
  return [
    {
      year: resolved.year ?? year,
      sourceIds: (resolved.sources ?? []).map((source) => source.id),
      note: resolved.note ?? "Resolved from CPF policy anchors.",
    },
  ];
}

function roundCpf(value: number): number {
  return Math.round(value / 100) * 100;
}
