import { NextRequest, NextResponse } from "next/server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { ZodError } from "zod";

import { filterAiResults } from "@/lib/filter-ai-results";
import { AiAnalysisModelMetadataSchema } from "@/schema/ai-response-schema";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const question1 = formData.get("question1") as string | null;
    const question2 = formData.get("question2") as string | null;

    if (!file || !question1 || !question2) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const model = google("gemini-2.0-flash-lite");

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const prompt = `You are a biomedical model extraction assistant. 
Analyze the scientific publication PDF and extract structured metadata according to the provided schema.

Extract all relevant information about the biomedical model described in this publication.

${question1 ? `\nAdditional Context 1: ${question1}` : ""}
${question2 ? `\nAdditional Context 2: ${question2}` : ""}

Pay special attention to any information related to the additional context provided above when extracting metadata.`;

    const result = await generateObject({
      model,
      schema: AiAnalysisModelMetadataSchema,
      system: prompt,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "file",
              data: uint8Array,
              mediaType: "application/pdf",
            },
          ],
        },
      ],
    });

    const filtered = filterAiResults(result.object);

    return NextResponse.json(filtered);
  } catch (error: unknown) {
    console.error("Upload error:", error);

    if (error instanceof ZodError) {
      console.error("Zod validation errors:", error.issues);
      return NextResponse.json(
        {
          error: "Invalid or incomplete data extraction",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Failed to process the file.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
