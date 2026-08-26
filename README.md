# VedaAI - AI Assessment Extraction & Answer Mapping

Welcome to the VedaAI Hiring Assignment submission! This repository contains a full-stack, AI-powered web application that allows teachers to upload a Question Paper and a Student's handwritten Answer Sheet, extracting the questions, mapping the answers, grading them, and highlighting their exact spatial locations on the original documents.

## 🚀 Live Demo

**Live URL:** https://vedaai-delta-cyan.vercel.app/

## ✨ Features and Capabilities

*   **Pixel-Perfect UI:** Fully responsive frontend layout matching the provided Figma designs (including sidebars, mobile hamburger navigation, dropzones, and custom SVG icons).
*   **Dual Document Parsing:** Accepts both Question Papers and Answer Sheets via a drag-and-drop file upload interface.
*   **Intelligent Extraction:** Extracts all questions from the question paper, flawlessly preserving the original numbering (e.g., `1`, `11a`, `11b`).
*   **Spatial Bounding Boxes:** Highlights the exact location of the handwritten answer on the uploaded document using mapped `[ymin, xmin, ymax, xmax]` coordinates. 
*   **Multi-Page Support:** Dynamically renders an array of bounding boxes for answers that span across multiple pages.
*   **Edge-Case Handling:** 
    *   Maps answers correctly even if they are answered out of order by the student.
    *   Identifies unanswered questions.
    *   Gracefully handles "Unmatched" answers (student scribbles or answers that don't belong to any question).
*   **Automated Grading:** Assigns a score (e.g., `2/2`) and provides brief, constructive AI feedback for the student.
*   **Interactive Results View:** A side-by-side interface where clicking a question automatically focuses the document viewer and highlights the relevant region.

## 🛠️ Architecture & Tech Stack

The application is built to be modern, scalable, and entirely serverless:
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS (configured for a mobile-first, responsive design with smooth transitions and micro-interactions)
*   **Typography:** Bricolage Grotesque (Google Fonts)
*   **PDF Rendering:** `react-pdf` (PDF.js wrapper for high-fidelity document viewing and coordinate mapping)
*   **AI Model:** Google Gemini 1.5/3.6 Flash. This specific multimodal model was chosen because of its exceptional capability in *Spatial Understanding* and OCR, allowing it to return accurate bounding box coordinates of handwritten text directly from images/PDFs.

## 🧠 The AI Approach

The core extraction logic resides in `/src/app/api/process-assessment/route.ts`. 

When the files are uploaded, they are passed as inline base64 data to the Gemini model along with a highly structured prompt. The prompt instructs the model to act as an expert grading assistant and enforces a strict JSON schema output. 

The model is explicitly instructed to:
1. Preserve original numbering.
2. Find corresponding answers (ignoring order).
3. Generate bounding boxes as percentages relative to the page dimensions to ensure the UI can draw the overlay precisely regardless of the viewer's scale/zoom level.
4. Catch unmatched answers and flag them separately.

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd vedaai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Google Gemini API Key.
*(Note: The application will fail to process documents if this key is missing).*
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚠️ Important Assumptions & Limitations
*   **API Key:** A valid Google Gemini API key is required. The free tier is sufficient for testing.
*   **File Size:** Next.js API routes typically have a 4MB payload limit by default on serverless platforms. For production, uploads should ideally be routed through a signed URL to a cloud storage bucket (like AWS S3) before processing, but direct upload is used here for simplicity as per the "no database" constraint.
*   **In-Memory Processing:** No database is used. If you refresh the Results page, the state is lost, fulfilling the assignment's exact requirements for an ephemeral, in-memory session.

---
*Developed for the VedaAI Hiring Assignment.*
