"use server";

import prisma from "@/lib/prisma";
import { SessionData } from "@auth0/nextjs-auth0/types";

export async function getUserStats(session: SessionData) {
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

export async function getDashboardStats(userId: string) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalSubmissions,
    draftModels,
    submittedModels,
    recentSubmissions7Days,
    recentSubmissions30Days,
  ] = await Promise.all([
    prisma.modelMetadata.count({
      where: { createdBy: userId },
    }),
    prisma.modelMetadata.count({
      where: {
        createdBy: userId,
        status: "DRAFT",
      },
    }),
    prisma.modelMetadata.count({
      where: {
        createdBy: userId,
        status: "SUBMITTED",
      },
    }),
    prisma.modelMetadata.count({
      where: {
        createdBy: userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    }),
    prisma.modelMetadata.count({
      where: {
        createdBy: userId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    }),
  ]);

  return {
    totalSubmissions,
    draftModels,
    submittedModels,
    recentSubmissions7Days,
    recentSubmissions30Days,
  };
}

export async function getUserWithStats(session: SessionData) {
  const { user } = session;
  let githubAccount;

  if (user.sub.includes("github|")) {
    githubAccount = user.nickname;
  }

  const dbUser = await prisma.user.upsert({
    where: {
      sub: user.sub,
    },
    update: {},
    create: {
      sub: user.sub,
      email: user.email,
      name: user.name,
      githubAccount,
    },
  });

  const stats = await getDashboardStats(dbUser.sub);

  return {
    user: dbUser,
    stats,
  };
}
