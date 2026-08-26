import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const questionPaper = formData.get("questionPaper") as File | null;
    const answerSheet = formData.get("answerSheet") as File | null;

    if (!questionPaper || !answerSheet) {
      return NextResponse.json({ error: "Both files are required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is provided, return an error
    if (!apiKey) {
      console.warn("No GEMINI_API_KEY found in .env");
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured on the server." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-3.6-flash for complex document reasoning and bounding boxes
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const qpBuffer = await questionPaper.arrayBuffer();
    const asBuffer = await answerSheet.arrayBuffer();

    const qpInlineData = {
      inlineData: {
        data: Buffer.from(qpBuffer).toString("base64"),
        mimeType: questionPaper.type,
      }
    };
    
    const asInlineData = {
      inlineData: {
        data: Buffer.from(asBuffer).toString("base64"),
        mimeType: answerSheet.type,
      }
    };

    const prompt = `
      You are an expert AI grading assistant. I am providing you with two documents:
      1. A Question Paper (first document)
      2. A student's handwritten Answer Sheet (second document)

      Your task is to:
      1. Extract all questions from the Question Paper. Preserve the original numbering (e.g., 1, 11a, 11b).
      2. Find the corresponding answers in the Answer Sheet. Note that answers might be out of order, span multiple pages, or be missing.
      3. For each found answer, provide its spatial locations as an array of bounding boxes: {ymin, xmin, ymax, xmax, page} where values are percentages (0-100) relative to the page dimensions (top-left is 0,0) and page is the 1-indexed page number. Use an array to support answers that span multiple pages.
      4. Grade the answer based on the question (assign marks, e.g., '2/2' or '0/2').
      5. Provide brief, constructive AI feedback for the answer.
      6. If you find an answer that does not correspond to any question, create an entry for it with number: "Unmatched", text: "Unmatched answer found", and its bounding boxes.

      Return the result STRICTLY as a JSON object with this exact schema:
      {
        "questions": [
          {
            "id": "unique-string-id",
            "number": "Question number (e.g., 1, 11a)",
            "text": "Full question text",
            "marks": "Score (e.g., '2/2', '0/2', 'unanswered')",
            "feedback": "AI feedback string (omit if unanswered)",
            "boundingBoxes": [
              {
                "ymin": number (0-100),
                "xmin": number (0-100),
                "ymax": number (0-100),
                "xmax": number (0-100),
                "page": number (1-indexed page number of the answer sheet)
              }
            ] // omit or empty array if answer not found
          }
        ]
      }
    `;

    const result = await model.generateContent([
      prompt,
      qpInlineData,
      asInlineData
    ]);

    const responseText = result.response.text();
    // Parse JSON from markdown code block if present
    const jsonStr = responseText.replace(/```json\n?|```/g, "").trim();
    const data = JSON.parse(jsonStr);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error processing assessment:", error);
    return NextResponse.json({ error: error.message || "Failed to process files" }, { status: 500 });
  }
}
