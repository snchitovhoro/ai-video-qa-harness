import express from "express";
import dotenv from "dotenv";
import videoRoutes from "./routes/video.routes";

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
🚀 AI Video Generator QA Harness Started
🌐 Server running at: http://localhost:${PORT}
📡 Health Check: http://localhost:${PORT}/api/video/health
  `);
});

export default app;