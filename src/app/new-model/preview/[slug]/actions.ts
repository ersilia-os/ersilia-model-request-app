import prisma from "@/lib/prisma";

export async function getSubmissionBySlug(slug:string) {
try{
    const submissionData = prisma.modelMetadata.findUnique({
    where: {
        slug 
    }
  })

  return submissionData
}
catch (error) {
    console.error("Error in saveMetadataAction:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
  
}