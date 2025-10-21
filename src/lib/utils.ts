import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import z from "zod";
import { ModelMetadata } from "../../generated/prisma";
import { MetadataFormSchema } from "@/schema/metadata-form-schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMetadataForDb(data: z.infer<typeof MetadataFormSchema>) {
  const formMetaData = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    interpretation: data.interpretation,
    tags: data.tags,
    task: data.task,
    subtask: data.subtask,
    input: data.input,
    inputDimension: data.input_dimension,
    output: data.output,
    outputDimension: data.output_dimension,
    outputConsistency: data.output_consistency,
    publicationUrl: data.publication_url,
    publicationYear: data.publication_year,
    publicationType: data.publication_type,
    sourceUrl: data.source_url,
    sourceType: data.source_type,
    deployment: data.deployment,
    biomedicalArea: data.biomedical_area,
    targetOrganism: data.target_organism,
    license: data.license,
  };
  return formMetaData;
}

export default function formatMetadataBody(data: ModelMetadata) {
  const sections: string[] = [];
  // Title
  sections.push(`## Model Name\n${data.title}`);
  // Description
  sections.push(`## Model Description\n${data.description}`);
  // SLug
  sections.push(`## Slug\n${data.slug}`);
  //Tags
  sections.push(`## Tags\n${data.tags.join(", ")}`);
  // Interpretation
  sections.push(`## Interpretation\n${data.interpretation}`);
  // Task
  const taskInfo = [];
  taskInfo.push(`**Task:** ${data.task}`);
  taskInfo.push(`**Subtask:** ${data.subtask}`);
  sections.push(`## Task Information\n${taskInfo.join("\n")}`);
  // Input
  const inputInfo = [`**Type:** ${data.input}`];
  inputInfo.push(`**Dimension:** ${data.inputDimension}`);
  sections.push(`## Input\n${inputInfo.join("\n")}`);
  // Output
  const outputInfo = [`**Type:** ${data.output.join(", ")}`];
  outputInfo.push(`**Dimension:** ${data.outputDimension}`);
  outputInfo.push(`**Consistency:** ${data.outputConsistency}`);
  sections.push(`## Output\n${outputInfo.join("\n")}`);
  // Biomedical Area
  sections.push(`## Biomedical Area\n${data.biomedicalArea.join(", ")}`);
  // Target Organism
  sections.push(`## Target Organism\n${data.targetOrganism.join(", ")}`);
  let pubSection = `## Publication\n${data.publicationUrl}`;
  pubSection += `\n**Type:** ${data.publicationType}`;
  pubSection += `\n**Year:** ${data.publicationYear}`;
  sections.push(pubSection);
  // Source Code
  let sourceSection = `## Source Code\n${data.sourceUrl}`;
  sourceSection += `\n**Type:** ${data.sourceType}`;
  sections.push(sourceSection);
  // License
  sections.push(`## License\n${data.license}`);
  // Deployment
  sections.push(`## Deployment\n${data.deployment}`);

  return sections.join("\n\n");
}

export function normalizeFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : "";

  const timestamp = Date.now();

  return `new_submission_${timestamp}${extension.toLowerCase()}`;
}
