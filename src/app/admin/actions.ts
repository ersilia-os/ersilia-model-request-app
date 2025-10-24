"use server";

import prisma from "@/lib/prisma";

export async function getPublishingUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        sub: true,
        email: true,
        metadataRecords: {
          select: {
            status: true,
            fileName: true,
            ErsiliaIssue: {
              select: {
                issueNumber: true,
                issueUrl: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to load authors", error);
    throw new Error("Failed to load authors");
  }
}
