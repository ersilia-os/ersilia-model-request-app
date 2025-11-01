import prisma from "@/lib/prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            metadataRecords: true,
          },
        },
        metadataRecords: {
          select: {
            status: true,
          },
        },
      },
    });
    const usersWithCounts = users.map((user) => {
      const draftCount = user.metadataRecords.filter(
        (record) => record.status === "DRAFT"
      ).length;

      const submittedCount = user.metadataRecords.filter(
        (record) => record.status === "SUBMITTED"
      ).length;

      return {
        sub: user.sub,
        name: user.name,
        email: user.email,
        githubAccount: user.githubAccount,
        count: user._count.metadataRecords,
        draftCount,
        submittedCount,
      };
    });

    return usersWithCounts;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
