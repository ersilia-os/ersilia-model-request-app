"use server";

import prisma from "@/lib/prisma";
import { SessionData } from "@auth0/nextjs-auth0/types";

export async function getOrCreateUser(session: SessionData) {
  const { user } = session;
  let githubAccount;

  if (user.sub.includes("github|")) {
    githubAccount = user.nickname;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      sub: user.sub,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.create({
    data: {
      sub: user.sub,
      email: user.email,
      name: user.name,
      githubAccount,
    },
  });

  return newUser;
}
