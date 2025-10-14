export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

interface PDFParseResult {
  text: string;
  info?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  version?: string;
}

type PdfParseFn = (data: Buffer) => Promise<PDFParseResult>;

export const ModelMetadataSchema = z.object({
  identifier: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(10),
  description: z.string().min(50),
  tags: z.array(z.string()).min(1).max(5),
  publication: z.string(),
  source_code: z.string().optional().default("Not available"),
  license: z.string().optional().default("Not specified"),
  status: z.literal("In Progress"),
  deployment: z.array(z.enum(["Local", "Online"])).min(1),
  source: z.enum(["Local", "Online"]),
  source_type: z.enum(["External", "Internal", "Replicated"]),
  task: z.enum(["Annotation", "Representation", "Sampling"]),
  subtask: z.enum([
    "Property calculation or prediction",
    "Activity prediction",
    "Featurization",
    "Projection",
    "Similarity search",
    "Generation",
  ]),
  input: z.literal("Compound"),
  input_dimension: z.literal(1),
  output: z.array(z.enum(["Score", "Value", "Compound", "Text"])).min(1),
  output_dimension: z.number().int().min(1),
  output_consistency: z.enum(["Fixed", "Variable"]),
  interpretation: z.string().min(10),
  biomedical_area: z.array(z.string()).min(1),
  target_organism: z.array(z.string()).default(["Not specified"]),
  publication_type: z.enum(["peer reviewed", "preprint", "other"]),
  publication_year: z.number().int().gte(1900).lte(new Date().getFullYear()),
});

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
  "publication": "...",
  "source_code": "...",
  "license": "...",
  "status": "In Progress",
  "deployment": ["Local", "Online"],
  "source": "Local",
  "source_type": "External",
  "task": "Representation",
  "subtask": "Activity prediction",
  "input": "Compound",
  "input_dimension": 1,
  "output": ["Score"],
  "output_dimension": 1,
  "output_consistency": "Fixed",
  "interpretation": "...",
  "biomedical_area": ["..."],
  "target_organism": ["..."],
  "publication_type": "peer reviewed",
  "publication_year": 2023
}

Publication text:
${text.slice(0, 15000)}

Do not add any commentary — only the JSON.
    `.trim();

    const { text: jsonString } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    let object;
    try {
      object = ModelMetadataSchema.parse(JSON.parse(jsonString));
    } catch (err) {
      console.error("❌ Schema validation failed:", err);
      console.error("LLM raw output:", jsonString);
      return NextResponse.json(
        { error: "Invalid or incomplete JSON output", raw: jsonString },
        { status: 400 }
      );
    }

    return NextResponse.json(object);
  } catch (error: unknown) {
    console.error("Upload error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to process the file." },
      { status: 500 }
    );
  }
}
