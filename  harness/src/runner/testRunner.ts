import path from "path";
import fs from "fs";

import { chromium } from "@playwright/test";

import { ReportGenerator } from "../reports/reportGenerator";
import { TestResult } from "../reports/models/report.types";

import { VideoGeneratorPage } from "../playwright/videoGeneratorPage";

import { PromptCase } from "../reports/models/promptCase.types";

import { ResultValidator } from "../validators/resultValidator";

export class TestRunner {
    static async run(
        baseUrl = "http://localhost:3000"
    ): Promise<TestResult[]> {
        /**
         * Load and parse promptCases.json
         */
        const promptCasesPath = path.resolve(
            __dirname,
            "C:\\Users\\snchi\\WebstormProjects\\ai-video-qa-harness\\ harness\\src\\data\\ promptCases.json"
        );

        const promptCasesRaw = fs.readFileSync(
            promptCasesPath,
            "utf-8"
        );

        const promptCases: PromptCase[] =
            JSON.parse(promptCasesRaw);

        const browser = await chromium.launch({
            headless: true
        });

        const results: TestResult[] = [];

        try {
            for (const promptCase of promptCases) {
                const page = await browser.newPage();

                const videoPage = new VideoGeneratorPage(page);

                const startedAt = Date.now();

                const screenshotPath = path.join(
                    "reports",
                    "screenshots",
                    `${promptCase.id}_success.png`
                );

                await videoPage.captureScreenshot(screenshotPath);

                try {

                    await videoPage.open(baseUrl);

                    await videoPage.submitPrompt(
                        promptCase.prompt
                    );

                    await videoPage.waitForGeneration(
                        promptCase.maxGenerationTimeSeconds *
                        1000
                    );

                    const metadata =
                        await videoPage.getMetadata();

                    const screenshotPath = path.join(
                        "reports",
                        "screenshots",
                        `${promptCase.id}_success.png`
                    );

                    await videoPage.captureScreenshot(
                        screenshotPath
                    );

                    const result = ResultValidator.validate({
                        promptCase,
                        durationMs: Date.now() - startedAt,
                        metadata,
                        screenshotPath
                    });
                    results.push(result);
                } catch (error) {
                    const result = ResultValidator.validate({
                        promptCase,
                        durationMs: Date.now() - startedAt,
                        errorMessage:
                            error instanceof Error ? error.message : "Unknown test failure",
                        screenshotPath
                    });

                    results.push(result);
                } finally {
                    await page.close();
                }
            }
        } finally {
            await browser.close();
        }

        ReportGenerator.generate(results);

        return results;
    }
}