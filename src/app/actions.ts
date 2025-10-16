"use server";

import prisma from "@/lib/prisma";

export async function getOrCreateUser(
  sub: string,
  email?: string,
  name?: string
) {
  const existingUser = await prisma.user.findUnique({
    where: { sub },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      sub,
      name,
      email,
    },
  });
}
