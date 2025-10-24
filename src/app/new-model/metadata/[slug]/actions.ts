"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { MetadataFormSchema } from "@/schema/metadata-form-schema";
import { Prisma } from "../../../../../generated/prisma";

type formData = z.infer<typeof MetadataFormSchema>;

export async function saveMetadataAction(data: formData, id: string) {
  try {
    const { githubAccount, ...rest } = data;

    const newModel = await prisma.modelMetadata.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    if (githubAccount && rest.isContributor) {
      await prisma.user.update({
        where: {
          sub: newModel.createdBy,
        },
        data: {
          githubAccount,
        },
      });
    }

    return { success: true, newModel, newSlug: newModel.slug };
  } catch (error) {
    console.error("Error in saveMetadataAction:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[] | undefined;
        const field = target?.[0] || "field";

        return {
          success: false,
          message: `This ${field} is already in use. Please choose a different one.`,
        };
      }
    }

    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function saveValidatedMetadataAction(data: formData, id: string) {
  const result = MetadataFormSchema.safeParse(data);

  try {
    if (!result.success) {
      return { success: false, message: "An unexpected error occurred." };
    }

    const { githubAccount, ...rest } = result.data;

    const validModelMetadata = await prisma.modelMetadata.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    if (githubAccount && rest.isContributor) {
      await prisma.user.update({
        where: {
          sub: validModelMetadata.createdBy,
        },
        data: {
          githubAccount,
        },
      });
    }

    return {
      success: true,
      validModelMetadata,
      newSlug: validModelMetadata.slug,
    };
  } catch (error) {
    console.error("Error in saveValidatedMetadataAction:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[] | undefined;
        const field = target?.[0] || "field";

        return {
          success: false,
          message: `This ${field} is already in use. Please choose a different one.`,
        };
      }
    }
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

export async function getGitHubAccount(sub: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        sub,
      },
    });

    if (user) {
      return { success: true, data: user.githubAccount };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Error getting model user", error);
    return {
      success: false,
      error: "Error getting model user",
    };
  }
}
