import express from "express";
import dotenv from "dotenv";

import videoRoutes from "../video-app/src/routes/video.routes";

import { TestRunner } from "./src/runner/testRunner";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    return res.status(200).json({
        service: "AI Video Generator QA Harness",
        status: "RUNNING",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

app.use("/api/video", videoRoutes);

/**
 * Execute AI video QA test suite
 */
app.get("/run-tests", async (_req, res) => {
    try {
        const results = await TestRunner.run();

        return res.status(200).json({
            success: true,
            message: "QA test suite completed successfully",
            totalTests: results.length,
            reportsGenerated: true,
            reportDirectory: "reports/"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: "Failed to execute QA test suite"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
🚀 AI Video Generator QA Harness Started

🌐 Server:
http://localhost:${PORT}

📡 Health Check:
http://localhost:${PORT}/api/video/health

🧪 Run QA Tests:
http://localhost:${PORT}/run-tests
  `);
});

export default app;