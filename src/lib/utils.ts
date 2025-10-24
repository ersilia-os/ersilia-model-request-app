import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ModelMetadata } from "../../generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function formatMetadataBody(
  data: ModelMetadata,
  contributor: string
) {
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
  //Contributor
  sections.push(`## Deployment\n@${contributor}`);

  return sections.join("\n\n");
}

export function normalizeFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : "";

  const timestamp = Date.now();

  return `ersilia_${timestamp}${extension.toLowerCase()}`;
}

export const setItem = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
