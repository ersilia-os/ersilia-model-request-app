import prisma from "@/lib/prisma";

export async function getSubmissionBySlug(slug: string) {
  try {
    const submissionData = await prisma.modelMetadata.findUnique({
      where: {
        slug,
      },
    });

    if (!submissionData) {
      return {
        success: false,
        message: "Submission not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Data retrieved from DB",
      data: submissionData,
    };
  } catch (error) {
    console.error("Error in saveMetadataAction:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}
