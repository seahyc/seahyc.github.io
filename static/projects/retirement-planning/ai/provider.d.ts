import type { AiCapabilities, PlanData, PlanRunResult, ProfileRecord } from "../types.js";
export declare function detectAiCapabilities(): Promise<AiCapabilities>;
export declare function buildHandoffPrompt(profile: ProfileRecord, plan: PlanData, result: PlanRunResult): string;
export declare function openHandoff(mode: "chatgpt" | "claude" | string | undefined, prompt: string): void;
