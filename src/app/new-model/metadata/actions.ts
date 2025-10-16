"use server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { MetadataFormSchema } from "@/lib/schemas";
import { z } from "zod";

type formData = z.infer<typeof MetadataFormSchema>;

export async function saveMetadataAction(data: formData) {
  const session = await auth0.getSession();
  if (!session || !session.user) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

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
    sourceUrl: data.source_type,
    sourceType: data.source_type,
    deployment: data.deployment,
    biomedicalArea: data.biomedical_area,
    targetOrganism: data.target_organism,
    license: data.license,
  };

  try {
    const userId = session.user.sub;

    const newModel = await prisma.modelMetadata.upsert({
      where: {
        slug: data.slug,
      },
      update: formMetaData,
      create: { ...formMetaData, createdBy: userId },
    });

    return { success: true, newModel };
  } catch (error) {
    console.error("Error in saveMetadataAction:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
