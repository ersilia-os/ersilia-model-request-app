"use server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { AiAnalysisModelMetadataSchema } from "@/schema/ai-response-schema";
import { z } from "zod";
import { Prisma } from "../../../generated/prisma";

type aiResult = z.infer<typeof AiAnalysisModelMetadataSchema>;

export async function addNewModelMetadata(
  data: aiResult,
  link: string,
  fileName: string
) {
  const session = await auth0.getSession();
  if (!session || !session.user) {
    return { success: false, error: "Unauthorized. Please log in." };
  }

  try {
    const userId = session.user.sub;

    const newModel = await prisma.modelMetadata.create({
      data: {
        ...data,
        linkPdfStorage: link,
        createdBy: userId,
        fileName: fileName,
      },
    });

    return { success: true, data: newModel };
  } catch (error) {
    console.error("Error creating model metadata:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[] | undefined;
        const field = target?.[0] || "field";

        return {
          success: false,
          error: `This publicaition has been already analyzed (${field} is already in use). Please choose a different one.`,
        };
      }
    }

    return {
      success: false,
      error: "Failed to save model metadata. Please try again.",
    };
  }
}
