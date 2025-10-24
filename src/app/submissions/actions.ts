"use server";
import prisma from "@/lib/prisma";

export async function getSubmissionsByUser(sub: string) {
  try {
    const submissionList = await prisma.modelMetadata.findMany({
      where: {
        createdBy: sub,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        updatedAt: true,
      },
    });

    return submissionList;
  } catch {
    throw new Error("You don't have any submissions");
  }
}
