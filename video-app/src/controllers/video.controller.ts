import { Request, Response } from "express";
import { VideoService } from "../services/video.service";

export class VideoController {
    static async generateVideo(req: Request, res: Response) {
        try {
            const { prompt } = req.body;

            if (!prompt || typeof prompt !== "string") {
                return res.status(400).json({
                    success: false,
                    error: "Prompt is required"
                });
            }

            const result = await VideoService.generateVideo({
                prompt
            });

            if (!result.success) {
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Internal server error"
            });
        }
    }

    static healthCheck(_req: Request, res: Response) {
        return res.status(200).json({
            status: "OK",
            service: "AI Video Generator QA Harness",
            timestamp: new Date().toISOString()
        });
    }
}