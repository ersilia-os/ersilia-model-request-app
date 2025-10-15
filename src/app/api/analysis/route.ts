import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { AiAnalysisModelMetadataSchema } from "@/lib/schemas";
import { ZodError } from "zod";
import { filterAiResults } from "@/lib/filter-ai-results";

export async function POST(req: NextRequest) {
  try {
    console.log("🟥 start ");
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Convert file to Uint8Array for the AI SDK
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const prompt = `You are a biomedical model extraction assistant. 
Analyze the scientific publication PDF and extract structured metadata according to the provided schema.
Extract all relevant information about the biomedical model described in this publication.`;
    const result = await generateObject({
      model: openai("gpt-5-nano"),
      schema: AiAnalysisModelMetadataSchema,
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

    console.log("🟥 finishReason", result.finishReason);

    const filtered = filterAiResults(result.object);
    return NextResponse.json(filtered);

    return NextResponse.json(result.object);
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
