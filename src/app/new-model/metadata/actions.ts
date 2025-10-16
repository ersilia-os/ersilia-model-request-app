"use server";

import prisma from "@/lib/prisma";
import { MetadataFormSchema } from "@/lib/schemas";
// import { getSession } from "@auth0/nextjs-auth0/server";
import { z } from "zod";

type ActionState = {
  message: string;
  success: boolean;
  slug?: string;
};

export async function saveMetadataAction(
  formData: z.infer<typeof MetadataFormSchema>,
  isFinalSubmit: boolean,
  existingSlug?: string
): Promise<ActionState> {
  const session = await getSession();
  if (!session || !session.user) {
    return { success: false, message: "Unauthorized. Please log in." };
  }
  const userId = session.user.sub;
  const status = isFinalSubmit ? "SUBMITTED" : "DRAFT";

  const safeNumber = (value: string | undefined): number | null => {
    const num = Number(value);
    return value && !isNaN(num) && num > 0 ? num : null;
  };

  const safeString = (value: string | undefined): string | null => {
    return value && value.trim().length > 0 ? value.trim() : null;
  };

  const dataForPrisma = {
    // Section 1: Always required
    title: formData.title,
    slug: formData.slug,
    status: status,

    // Convert array fields to array or null (Section 3)
    tags: formData.tags.length > 0 ? formData.tags : null,
    biomedicalArea:
      formData.biomedical_area.length > 0 ? formData.biomedical_area : null,
    targetOrganism:
      formData.target_organism.length > 0 ? formData.target_organism : null,
    output: formData.output.length > 0 ? formData.output : null,

    // Section 2: Optional fields, convert empty strings to null
    description: safeString(formData.description),
    interpretation: safeString(formData.interpretation),
    task: safeString(formData.task),
    subtask: safeString(formData.subtask),
    input: safeString(formData.input),
    output_consistency: safeString(formData.output_consistency),
    publication_url: safeString(formData.publication_url),
    publication_type: safeString(formData.publication_type),
    source_url: safeString(formData.source_url),
    source_type: safeString(formData.source_type),
    deployment: safeString(formData.deployment),
    license: safeString(formData.license),

    // Section 3: Numeric fields, convert invalid numbers to null
    input_dimension: safeNumber(formData.input_dimension),
    output_dimension: safeNumber(formData.output_dimension),
    publication_year: safeNumber(formData.publication_year),

    createdBy: userId,
  };

  try {
    const upsertRecord = await prisma.modelMetadata.upsert({
      where: { slug: existingSlug || formData.slug },

      update: {
        // When updating an existing record
        ...dataForPrisma,
        updatedAt: new Date(),
      },
      create: {
        // When creating a new record
        ...dataForPrisma,
      },
      select: { slug: true },
    });

    return {
      success: true,
      message: `Metadata saved as ${status.toLowerCase()}.`,
      slug: upsertRecord.slug,
    };
  } catch (error) {
    console.error("Database Write Error:", error);
    // if ((error as any).code === "P2002" && !existingSlug) {
    //   return {
    //     success: false,
    //     message: "The slug already exists. Please choose a unique one.",
    //   };
    // }
    return { success: false, message: "Failed to save data." };
  }
}
