"use server";
import prisma from "@/lib/prisma";

export async function getSubmissionBySlug(slug: string) {
  const submission = await prisma.modelMetadata.findUnique({
    where: {
      slug,
    },
  });
  return submission;
}
