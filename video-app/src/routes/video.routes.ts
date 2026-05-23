import express from "express";
import { VideoController } from "../controllers/video.controller";

const router = express.Router();

router.get("/health", VideoController.healthCheck);

router.post("/generate-video", VideoController.generateVideo);

export default router;