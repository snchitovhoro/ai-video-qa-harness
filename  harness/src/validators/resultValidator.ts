import { TestResult, TestStatus } from "../reports/models/report.types";
import { PromptCase } from "../reports/models/promptCase.types";
import { VideoMetadata } from "../playwright/videoGeneratorPage";


export interface ValidationInput {
    promptCase: PromptCase;
    durationMs: number;
    metadata?: VideoMetadata;
    errorMessage?: string;
    screenshotPath?: string;
}

export class ResultValidator {
    static validate(input: ValidationInput): TestResult {
        const status = this.determineStatus(input);

        return {
            promptId: input.promptCase.id,
            prompt: input.promptCase.prompt,
            category: input.promptCase.category,
            status,
            durationMs: input.durationMs,
            screenshotPath: input.screenshotPath,
            errorMessage: status === "PASS" ? undefined : input.errorMessage,
            metadata:
                status === "PASS"
                    ? {
                        videoUrl: input.metadata?.videoUrl,
                        resolution: input.metadata?.resolution,
                        durationSeconds: input.metadata?.durationSeconds,
                        modelVersion: input.metadata?.modelVersion
                    }
                    : undefined,
            createdAt: new Date().toISOString()
        };
    }

    private static determineStatus(input: ValidationInput): TestStatus {
        if (input.errorMessage) {
            return this.mapErrorToStatus(input.errorMessage);
        }

        const maxDurationMs = input.promptCase.maxGenerationTimeSeconds * 1000;

        if (input.durationMs > maxDurationMs) {
            return "FAIL_TIMEOUT";
        }

        if (!input.metadata?.videoUrl) {
            return "FAIL_NO_VIDEO";
        }

        if (
            !input.metadata.resolution ||
            !input.metadata.durationSeconds ||
            !input.metadata.modelVersion
        ) {
            return "FAIL_METADATA_MISSING";
        }

        return "PASS";
    }

    private static mapErrorToStatus(errorMessage: string): TestStatus {
        const normalized = errorMessage.toLowerCase();

        if (normalized.includes("timeout")) {
            return "FAIL_TIMEOUT";
        }

        if (normalized.includes("unsafe") || normalized.includes("rejected")) {
            return "FAIL_UNSAFE_PROMPT";
        }

        if (normalized.includes("crash") || normalized.includes("page closed")) {
            return "FAIL_UI_CRASH";
        }

        if (normalized.includes("server") || normalized.includes("500")) {
            return "FAIL_SERVER_ERROR";
        }

        return "FAIL_SERVER_ERROR";
    }
}