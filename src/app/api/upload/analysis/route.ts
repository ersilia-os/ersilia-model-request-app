export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { ModelMetadataSchema } from "@/lib/schemas";
import { z, ZodError } from "zod";

interface PDFParseResult {
  text: string;
  info?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  version?: string;
}

type PdfParseFn = (data: Buffer) => Promise<PDFParseResult>;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mod = await import("pdf-parse/lib/pdf-parse.js");
    let pdfCandidate: unknown = mod;

    for (let i = 0; i < 2; i++) {
      if (
        pdfCandidate &&
        typeof pdfCandidate === "object" &&
        "default" in pdfCandidate
      ) {
        pdfCandidate = (pdfCandidate as { default: unknown }).default;
      }
    }

    if (typeof pdfCandidate !== "function") {
      throw new Error("pdf-parse import failed — not a function");
    }

    const pdf = pdfCandidate as PdfParseFn;
    const parsed = await pdf(buffer);
    const text = parsed.text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "No text extracted. PDF may be image-based or corrupted." },
        { status: 400 }
      );
    }

    const prompt = `
You are a biomedical model extraction assistant. 
Analyze the following scientific publication text and extract structured metadata.

Return ONLY a valid JSON object (no markdown, no explanation, no prose).
Your output must exactly match this schema:

{
  "identifier": "...",
  "slug": "...",
  "title": "...",
  "description": "...", 
  "tags": ["..."],
  "publication_url": "...",
  "source_url": "...",
  "license": "...",
  "status": "...",
  "deployment": "...",
  "source_type": "...",
  "task": "...",
  "subtask": "...",
  "input": "...",
  "input_dimension": "1",
  "output": ["..."],
  "output_dimension": "1",
  "output_consistency": "...",
  "interpretation": "...",
  "biomedical_area": ["..."],
  "target_organism": ["..."],
  "publication_type": "...",
  "publication_year": "..."
}

Publication text:
${text.slice(0, 15000)}

Do not add any commentary — only the JSON.
    `.trim();

    const { text: jsonString } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });
    try {
      const parsedJSON = JSON.parse(jsonString);
      const validated = ModelMetadataSchema.parse(parsedJSON);
      return NextResponse.json(validated);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        console.error("Zod validation errors:", err.issues);
      } else {
        console.error("Schema validation failed:", err);
      }

      console.error("LLM raw output:", jsonString);

      return NextResponse.json(
        {
          error: "Invalid or incomplete JSON output",
          issues: err instanceof ZodError ? err.issues : undefined,
          raw: jsonString,
        },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process the file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
