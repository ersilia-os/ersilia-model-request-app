"use server";

import prisma from "@/lib/prisma";

import { MetadataFormSchema } from "@/schema/metadata-form-schema";
import { z } from "zod";

type formData = z.infer<typeof MetadataFormSchema>;

export async function saveMetadataAction(data: formData, id: string) {
  try {
    const newModel = await prisma.modelMetadata.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return { success: true, newModel, newSlug: newModel.slug };
  } catch (error) {
    console.error("Error in saveMetadataAction:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function saveValidatedMetadataAction(data: formData, id: string) {
  const result = MetadataFormSchema.safeParse(data);

  try {
    if (!result.success) {
      return { success: false, message: "An unexpected error occurred." };
    }

    const validModelMetadata = await prisma.modelMetadata.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return {
      success: true,
      validModelMetadata,
      newSlug: validModelMetadata.slug,
    };
  } catch (error) {
    console.error("Error in saveValidatedMetadataAction:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getModelMetadatBySlug(slug: string) {
  try {
    const modelMetadata = await prisma.modelMetadata.findUnique({
      where: {
        slug,
      },
    });

    return { success: true, data: modelMetadata };
  } catch (error: unknown) {
    console.error("Error getting model metadata", error);
    return {
      success: false,
      error: "Error getting model metadata",
    };
  }
}
