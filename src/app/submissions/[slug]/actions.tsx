"use server";
import prisma from "@/lib/prisma";

export async function getSubmissionBySlug(slug: string) {
  const submission = await prisma.modelMetadata.findUnique({
    where: {
      slug,
    },
    include: {
      ErsiliaIssue: true,
    },
  });
  return submission;
}
