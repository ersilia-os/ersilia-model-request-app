"use server";

import prisma from "@/lib/prisma";

export async function getOrCreateUser(
  sid: string,
  userData: {
    name: string;
  }
) {
  const existingUser = await prisma.user.findUnique({
    where: { sid },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      sid,
      name: userData.name,
    },
  });
}
