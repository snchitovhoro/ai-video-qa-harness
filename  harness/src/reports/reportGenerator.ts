import fs from "fs";

import {
    ReportSummary,
    TestResult
} from "./models/report.types";

import { JsonReportGenerator } from "./generators/jsonReportGenerator";
import { MarkdownReportGenerator } from "./generators/markdownReportGenerator";
import { HtmlReportGenerator } from "./generators/htmlReportGenerator";


export class ReportGenerator {
    static generate(
        results: TestResult[],
        outputDir = "reports"
    ): void {
        this.ensureDirectory(outputDir);

        const summary = this.buildSummary(results);

        JsonReportGenerator.generate(summary, results, outputDir);

        MarkdownReportGenerator.generate(summary, results, outputDir);

        HtmlReportGenerator.generate(summary, results, outputDir);
    }

    private static ensureDirectory(directory: string): void {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    private static buildSummary(
        results: TestResult[]
    ): ReportSummary {
        const total = results.length;

        const passed = results.filter(
            (r) => r.status === "PASS"
        ).length;

        const failed = total - passed;

        const averageDurationMs =
            total === 0
                ? 0
                : Math.round(
                    results.reduce(
                        (sum, result) => sum + result.durationMs,
                        0
                    ) / total
                );

        const slowestTest = results.reduce<TestResult | null>(
            (slowest, current) => {
                if (
                    !slowest ||
                    current.durationMs > slowest.durationMs
                ) {
                    return current;
                }

                return slowest;
            },
            null
        );

        const failuresByStatus = results.reduce<
            Record<string, number>
        >((acc, result) => {
            if (result.status !== "PASS") {
                acc[result.status] =
                    (acc[result.status] || 0) + 1;
            }

            return acc;
        }, {});

        return {
            total,
            passed,
            failed,
            averageDurationMs,
            slowestPromptId: slowestTest?.promptId ?? null,
            slowestDurationMs: slowestTest?.durationMs ?? null,
            failuresByStatus,
            generatedAt: new Date().toISOString()
        };
    }
}