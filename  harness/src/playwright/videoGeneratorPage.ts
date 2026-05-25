import { Page } from "@playwright/test";

export interface VideoMetadata {
    videoUrl?: string;
    resolution?: string;
    durationSeconds?: number;
    modelVersion?: string;
}

export class VideoGeneratorPage {
    constructor(private readonly page: Page) {}

    async open(baseUrl = "http://localhost:3000"): Promise<void> {
        await this.page.goto(baseUrl);
    }

    async submitPrompt(prompt: string): Promise<void> {
        await this.page.fill('[data-testid="prompt-input"]', prompt);
        await this.page.click('[data-testid="generate-button"]');
    }

    async waitForGeneration(timeoutMs = 120000): Promise<void> {
        await this.page.waitForSelector('[data-testid="generation-complete"]', {
            timeout: timeoutMs
        });
    }

    async waitForError(timeoutMs = 120000): Promise<void> {
        await this.page.waitForSelector('[data-testid="generation-error"]', {
            timeout: timeoutMs
        });
    }

    async getVideoStatus(): Promise<"SUCCESS" | "ERROR" | "PENDING"> {
        if (await this.page.locator('[data-testid="generation-complete"]').isVisible()) {
            return "SUCCESS";
        }

        if (await this.page.locator('[data-testid="generation-error"]').isVisible()) {
            return "ERROR";
        }

        return "PENDING";
    }

    async getErrorMessage(): Promise<string | undefined> {
        const errorLocator = this.page.locator('[data-testid="generation-error"]');

        if (!(await errorLocator.isVisible())) {
            return undefined;
        }

        return errorLocator.textContent().then((text) => text?.trim());
    }

    async captureScreenshot(path: string): Promise<void> {
        await this.page.screenshot({
            path,
            fullPage: true
        });
    }

    async getMetadata(): Promise<VideoMetadata> {
        const videoUrl = await this.getOptionalText('[data-testid="video-url"]');
        const resolution = await this.getOptionalText('[data-testid="video-resolution"]');
        const durationText = await this.getOptionalText('[data-testid="video-duration"]');
        const modelVersion = await this.getOptionalText('[data-testid="model-version"]');

        return {
            videoUrl,
            resolution,
            durationSeconds: durationText ? Number(durationText) : undefined,
            modelVersion
        };
    }

    private async getOptionalText(selector: string): Promise<string | undefined> {
        const locator = this.page.locator(selector);

        if ((await locator.count()) === 0 || !(await locator.isVisible())) {
            return undefined;
        }

        const text = await locator.textContent();

        return text?.trim();
    }
}