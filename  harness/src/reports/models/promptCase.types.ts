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