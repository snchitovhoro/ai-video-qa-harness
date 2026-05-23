import fs from "fs";
import path from "path";

import {
    ReportSummary,
    TestResult
} from "../models/report.types";

export class HtmlReportGenerator {
    static generate(
        summary: ReportSummary,
        results: TestResult[],
        outputDir: string
    ): void {
        const rows = results
            .map(
                (result) => `
<tr>
  <td>${result.promptId}</td>
  <td>${result.category}</td>
  <td>${result.status}</td>
  <td>${result.durationMs}ms</td>
  <td>${result.errorMessage ?? "-"}</td>
</tr>`
            )
            .join("");

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>AI Video QA Report</title>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f5f5f5;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
}

th {
  background: #eee;
}

.PASS {
  color: green;
  font-weight: bold;
}

[class^="FAIL"] {
  color: red;
  font-weight: bold;
}
</style>
</head>

<body>
<h1>AI Video QA Test Report</h1>

<h2>Summary</h2>

<ul>
  <li>Total Tests: ${summary.total}</li>
  <li>Passed: ${summary.passed}</li>
  <li>Failed: ${summary.failed}</li>
  <li>Average Duration: ${summary.averageDurationMs}ms</li>
</ul>

<h2>Results</h2>

<table>
<thead>
<tr>
  <th>Prompt ID</th>
  <th>Category</th>
  <th>Status</th>
  <th>Duration</th>
  <th>Error</th>
</tr>
</thead>

<tbody>
${rows}
</tbody>
</table>

</body>
</html>
`;

        fs.writeFileSync(
            path.join(outputDir, "report.html"),
            html,
            "utf-8"
        );
    }
}