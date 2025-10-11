export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

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
        pdfCandidate = (pdfCandidate as unknown as { default: unknown })
          .default;
      }
    }

    if (typeof pdfCandidate !== "function") {
      console.error("pdf-parse module shape invalid:", mod);
      throw new Error("pdf-parse import failed — not a function");
    }

    const pdf = pdfCandidate as PdfParseFn;

    const parsed = await pdf(buffer);
    const text = parsed.text?.trim();

    if (!text) {
      console.error("PDF info:", parsed.info);
      return NextResponse.json(
        { error: "No text extracted. PDF may be image-based or corrupted." },
        { status: 400 }
      );
    }

    const prompt = `
Your are a biomedical expert. You have to make a structured report of a scientific publication. The publication will be provided as a PDF file.
Your report needs to be concise and informative. Strictly follow this structure, in Markdown format:

# Publication details
- Title: Just copy the title of the publication
- Authors: List the authors separated by commas. For example, G. Turon, M. Duran-Frigola and D. Arora.
- Journal: Name of the journal
- Year: Year of publication
- Suggested slug: A short version of the title, with hyphens instead of spaces. For example, "deep-learning-for-malaria". The slug should be all lowercase. It cannot be longer than 50 characters and should not contain more than 5 hyphens. If there is a name for the method, for example, chemprop, try to use it in the slug. Do not add dates or names of authors. If possible, do not include words such as ml (for machine learning) or ai (for artificial intelligence).
- Suggested computational title: Suggest a title that is focused on the computational methods used in the publication. For example, "Broad-spectrum antibiotics activity prediction" or "MAIP, antimalarial activity prediction based on multiple industry datasets".

# TLDR
Write a short summary of the publication in one or two sentences. This should be a high-level overview of the publication.
Do not use new-line characters. The TLDR should have between 100 and 200 characters.

# Summary
Write a summary of the publication. Feel free to use the information on the Abstract, if available.
The summary should be between 100 and 200 words. Only one paragraph. No new-line characters are allowed. No special characters, boldface, links or references are allowed.
Use a concise style.

# Relevance to biomedical research
Briefly discuss why the publication is relevant to biomedicine or drug discovery.
If the publication is related to a particular disease or pathogen, make sure to mention it.
If the publication is related to a particular stage of the drug discovery pipeline, make sure to mention it.
This should be between 50 and 100 words. Only one paragraph. No new-line characters.
Use a concise style.

# Computational methods
Write a summary of the computational methods used in this publication.
If AI/ML methods are used, focus on those. Mention the main techniques and methods.
Try to explain what the input and output of the methods are. In addition, try to explain how to interpret the output and what range of values are expected and relevant (if applicable).
If training data was used, mention the size and source of the data.
If accuracy was reported, make sure to mention it.
The summary should be between 100 and 200 words. Only one paragraph. No new-line characters are allowed. No special characters, boldface, links or references are allowed.
Use a concise style.

# Biomedical keywords
Suggest 3 to 5 keywords that are relevant to the publication. These keywords should be related to the biomedical or drug discovery aspects of the publication.
If the publication is not related to biomedicine, do not suggest any keywords.
- Keyword 1
- Keyword 2
- Keyword 3

# Computational keywords
Suggest 3 to 5 keywords that are relevant to the publication. These keywords should be related to the computational aspects of the publication, especially the AI/ML aspects, if applicable.
Do not use keywords that are too generic, such as "machine learning", "deep learning" or "descriptors".
- Keyword 1
- Keyword 2
- Keyword 3

# Strenghts
Discuss the strengths of the publication, especially from the perspective of the computational methods and the training dataset, if applicable.
Why are the results of the publication important or relevant? What are the main contributions of the publication?
This should be between 50 and 100 words. Only one paragraph. No new-line characters.

# Limitations
Discuss the limitations of the publication, especially from the perspective of the computational methods and the training dataset, if applicable.
What could be improved in the publication? What are the main weaknesses? Are the computational methods novel? Are the results reliable? Are the conclusions valid?
Is the dataset large enough? Is the data of high quality?
This should be between 50 and 100 words. Only one paragraph. No new-line characters.

# Overall relevance
Try to assess the relevance of the publication in the context of the current knowledge in the field.
In your assessment, consider the novelty of the methods, the quality of the results, and the potential impact of the publication.
The date of publication is also important.
The size of the dataset and the quality of the data are also important factors to consider.
If prior art on the topic or similar articles exist in the literature, this should penalize the relevance. Novelty is important.
Also consider the performance of the computational methods, and compare it with the performance of other methods.
The impact factor of the journal is an important factor for relevance. Higher relevance should be given to higher impact journals.
Do not be over-emphatic. Try to be explicit about the high, medium or low relevance of the publication. Not all publications are highly relevant, so do a fair assessment.
This should be between 50 and 100 words. Only one paragraph. No new-line characters. Be concise.

---

Below are some style guidelines for the report:
- Always use the third person and do not use personal pronouns.
- Do not start paragraphs with sentences such as "this study", "this publication", "this report" or "the authors". Directly explain the content. For example, do not say "This study develops a method for...". Instead, say "A method was developed for..." or similar.
- Do not include references or links.
- Do not include any special characters, boldface, or italics.
- Each section should be a separate paragraph (one and only one paragraph per section) or a bullet point list, as applicable.
- Do not include any information about the number of pages of the publication.
- Do not mention the figures or tables in the publication.
- Do not mention other references in the publication.
- Do not mention funding sources or acknowledgements.
- Do not begin your answer with a sentence like: "here is a structured report of the publication". Start with the report itself.
- Do not end your answer with a conclusion or a summary. The report should be self-contained.

---
Below is the plain text extracted from the provided PDF. Use only this content to prepare the report.

${text.slice(0, 10000)}
    `.trim();

    const { text: report } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
    });

    return NextResponse.json({ report });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Upload error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process the file." },
      { status: 500 }
    );
  }
}
