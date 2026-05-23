export interface VideoGenerationRequest {
    prompt: string;
}

export interface GeneratedVideo {
    id: string;
    url: string;
    resolution: string;
    durationSeconds: number;
    modelVersion: string;
}

export interface VideoGenerationResponse {
    success: boolean;
    prompt?: string;
    video?: GeneratedVideo;
    generationTimeMs?: number;
    error?: string;
}