import {
    VideoGenerationRequest,
    VideoGenerationResponse
} from "../types/video.types";

import { delay } from "../utils/delay";
import { getRandomFailure } from "../utils/randomFailure";

export class VideoService {
    static async generateVideo(
        data: VideoGenerationRequest
    ): Promise<VideoGenerationResponse> {
        const processingTime = Math.floor(Math.random() * 5000) + 2000;

        await delay(processingTime);

        const failure = getRandomFailure();

        if (failure) {
            return {
                success: false,
                error: failure
            };
        }

        return {
            success: true,
            prompt: data.prompt,
            generationTimeMs: processingTime,
            video: {
                id: `video_${Date.now()}`,
                url: `https://example.com/generated/${Date.now()}.mp4`,
                resolution: "1920x1080",
                durationSeconds: 12,
                modelVersion: "video-gen-v1"
            }
        };
    }
}