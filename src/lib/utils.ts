import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MetadataFormSchema } from "./schemas";
import z from "zod";

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
