export type PromptCategory =
    | "basic"
    | "edge-case"
    | "stress"
    | "negative"
    | "safety";

export interface PromptCase {
    id: string;
    category: PromptCategory;
    prompt: string;
    expectedKeywords?: string[];
    maxGenerationTimeSeconds: number;
}
export type TestStatus =
    | "PASS"
    | "FAIL_TIMEOUT"
    | "FAIL_NO_VIDEO"
    | "FAIL_SERVER_ERROR"
    | "FAIL_UNSAFE_PROMPT"
    | "FAIL_UI_CRASH"
    | "FAIL_METADATA_MISSING";

export interface TestResult {
    promptId: string;
    prompt: string;
    category: string;
    status: TestStatus;
    durationMs: number;
    screenshotPath?: string;
    errorMessage?: string;
    metadata?: {
        videoUrl?: string;
        resolution?: string;
        durationSeconds?: number;
        modelVersion?: string;
    };
    createdAt: string;
}

export interface ReportSummary {
    total: number;
    passed: number;
    failed: number;
    averageDurationMs: number;
    slowestPromptId: string | null;
    slowestDurationMs: number | null;
    failuresByStatus: Record<string, number>;
    generatedAt: string;
}