"use server";

import prisma from "@/lib/prisma";

export async function getPublishingUsers() {
  try {
    return await prisma.user.findMany({
      include: {
        metadataRecords: true,
      },
    });
  } catch (error) {
    console.error("Failed to load authors", error);
    throw new Error("Failed to load authors");
  }
}
