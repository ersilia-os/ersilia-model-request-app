"use server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { MetadataFormSchema } from "@/lib/schemas";
import { formatMetadataForDb } from "@/lib/utils";
import { z } from "zod";

type formData = z.infer<typeof MetadataFormSchema>;

export async function saveMetadataAction(data: formData) {
  const session = await auth0.getSession();
  if (!session || !session.user) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  const formatedMetadata = formatMetadataForDb(data);

  try {
    const userId = session.user.sub;

    const newModel = await prisma.modelMetadata.upsert({
      where: {
        slug: data.slug,
      },
      update: formatedMetadata,
      create: { ...formatedMetadata, createdBy: userId },
    });

    return { success: true, newModel };
  } catch (error) {
    console.error("Error in saveMetadataAction:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function saveValidatedMetadataAction(data: formData) {
  const session = await auth0.getSession();
  if (!session || !session.user) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  const result = MetadataFormSchema.safeParse(data);

  try {
    if (!result.success) {
      return { success: false, message: "An unexpected error occurred." };
    }

    const formatedMetadata = formatMetadataForDb(result.data);

    const userId = session.user.sub;

    const validModelMetadata = await prisma.modelMetadata.upsert({
      where: {
        slug: data.slug,
      },
      update: formatedMetadata,
      create: { ...formatedMetadata, createdBy: userId },
    });
    return { success: true, validModelMetadata };
  } catch (error) {
    console.error("Error in saveValidatedMetadataAction:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
