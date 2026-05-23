import fs from "fs";
import path from "path";

import {
    ReportSummary,
    TestResult
} from "../models/report.types";

export class JsonReportGenerator {
    static generate(
        summary: ReportSummary,
        results: TestResult[],
        outputDir: string
    ): void {
        const report = {
            summary,
            results
        };

        fs.writeFileSync(
            path.join(outputDir, "report.json"),
            JSON.stringify(report, null, 2),
            "utf-8"
        );
    }
}