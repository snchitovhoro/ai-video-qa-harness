import fs from "fs";
import path from "path";

import {
    ReportSummary,
    TestResult
} from "../models/report.types";

export class MarkdownReportGenerator {
    static generate(
        summary: ReportSummary,
        results: TestResult[],
        outputDir: string
    ): void {
        const rows = results
            .map(
                (result) =>
                    `| ${result.promptId} | ${result.category} | ${result.status} | ${result.durationMs}ms | ${result.errorMessage ?? "-"} |`
            )
            .join("\n");

        const markdown = `# AI Video QA Test Report

## Summary

- Total Tests: ${summary.total}
- Passed: ${summary.passed}
- Failed: ${summary.failed}
- Average Duration: ${summary.averageDurationMs}ms
- Slowest Prompt: ${summary.slowestPromptId ?? "-"}
- Slowest Duration: ${summary.slowestDurationMs ?? "-"}ms
- Generated At: ${summary.generatedAt}

## Failures By Status

\`\`\`json
${JSON.stringify(summary.failuresByStatus, null, 2)}
\`\`\`

## Results

| Prompt ID | Category | Status | Duration | Error |
|---|---|---|---|---|
${rows}
`;

        fs.writeFileSync(
            path.join(outputDir, "report.md"),
            markdown,
            "utf-8"
        );
    }
}