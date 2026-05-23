# AI Video Generator QA Harness

A TypeScript-based automated QA platform for testing AI-powered video generation workflows.

This project simulates real-world AI product quality engineering scenarios including:

- Prompt execution testing
- Video generation validation
- Failure detection
- Timeout handling
- Structured bug reporting
- Screenshot capture
- Latency tracking
- Automated regression testing

The harness is designed to emulate the type of AI quality engineering systems used internally by modern AI product companies.

---

# Features

## Automated AI Workflow Testing

- Submits prompts automatically
- Simulates AI video generation
- Tracks execution status
- Measures generation latency

## Failure Detection

Detects and classifies failures such as:

- Timeout failures
- Missing video output
- Server errors
- Invalid prompt handling
- Metadata validation issues

## Structured Reporting

Generates:

- JSON reports
- HTML reports
- Markdown summaries

## Screenshot Capture

Captures screenshots for:

- Initial UI state
- Loading state
- Successful generations
- Failure states

## Playwright-Ready Architecture

Built with a scalable architecture suitable for:

- End-to-end testing
- Regression testing
- AI product validation
- CI/CD pipelines

---

# Tech Stack

- TypeScript
- Node.js
- Express
- Playwright
- Jest
- GitHub Actions

---

# Project Structure

```text
video-app/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── server.ts
│   └── index.ts
│
├── reports/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
└── README.md
```

---

# API Endpoints

## Health Check

```http
GET /api/video/health
```

Example response:

```json
{
  "status": "OK",
  "service": "AI Video Generator QA Harness"
}
```

---

## Generate Video

```http
POST /api/video/generate-video
```

Request body:

```json
{
  "prompt": "A futuristic city at sunset"
}
```

Example success response:

```json
{
  "success": true,
  "prompt": "A futuristic city at sunset",
  "generationTimeMs": 4821,
  "video": {
    "id": "video_172992991",
    "url": "https://example.com/generated/video.mp4",
    "resolution": "1920x1080",
    "durationSeconds": 12,
    "modelVersion": "video-gen-v1"
  }
}
```

Example failure response:

```json
{
  "success": false,
  "error": "Video generation timeout"
}
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ai-video-qa-harness.git
```

## Navigate Into Project

```bash
cd ai-video-qa-harness/video-app
```

## Install Dependencies

```bash
npm install
```

---

# Running the Project

## Development Mode

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

# Build for Production

```bash
npm run build
npm start
```

---

# Running Tests

## Unit Tests

```bash
npm test
```

## Video QA Tests

```bash
npm run test:video
```

---

# CI/CD Pipeline

GitHub Actions pipeline automatically performs:

- Dependency installation
- TypeScript checks
- Linting
- Unit testing
- Playwright testing
- Artifact upload

Workflow file:

```text
.github/workflows/ci.yml
```

---

# Example QA Failure Categories

| Failure Type | Description |
|---|---|
| FAIL_TIMEOUT | Generation exceeded allowed duration |
| FAIL_SERVER_ERROR | Backend service error |
| FAIL_NO_VIDEO | Generation completed without video |
| FAIL_UI_CRASH | Frontend became unresponsive |
| FAIL_METADATA_MISSING | Missing output metadata |

---

# Engineering Goals

This project demonstrates:

- AI product quality engineering
- TypeScript backend architecture
- Automated testing workflows
- Playwright automation readiness
- Failure analysis systems
- QA infrastructure design
- CI/CD automation

---

# Future Improvements

- Real AI video model integration
- Visual regression testing
- Screenshot diff analysis
- AI prompt fuzz testing
- Performance benchmarking
- Multi-browser Playwright execution
- Database persistence
- React dashboard UI
- Docker support
- Kubernetes deployment

---

# Author

Simbarashe Chitovhoro

Software Engineer | AI Quality Engineering | Automation Testing