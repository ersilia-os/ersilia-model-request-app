"use server";

import { getOctokit } from "@/lib/github";
import prisma from "@/lib/prisma";
import formatMetadataBody from "@/lib/utils";

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

interface SubmitToErsiliaResult {
  success: boolean;
  message: string;
}

export async function submitToErsilia(
  submissionId: string,
  githubConfig: {
    owner: string;
    repo: string;
  }
): Promise<SubmitToErsiliaResult> {
  try {
    const submission = await prisma.modelMetadata.findUnique({
      where: { id: submissionId },
    });

    if (!submission || !githubConfig.owner || !githubConfig.repo) {
      return {
        success: false,
        message: "Submission not found",
      };
    }

    if (submission.status === "SUBMITTED") {
      return {
        success: false,
        message: "This submission has already been sent to Ersilia",
      };
    }

    const issueBody = formatMetadataBody(submission);

    const octokit = await getOctokit();

    const { data: issueData } = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        title: `🦠 Model Request: ${submission.title}`,
        body: issueBody,
        labels: ["model-submission", "metadata"],
      }
    );
    console.log(issueData);

    await prisma.$transaction(async (tx) => {
      await tx.ersiliaIssue.create({
        data: {
          issueNumber: issueData.number,
          issueUrl: issueData.html_url,
          modelMetadataId: submissionId,
        },
      });

      await tx.modelMetadata.update({
        where: { id: submissionId },
        data: {
          status: "SUBMITTED",
        },
      });
    });

    return {
      success: true,
      message: "Successfully submitted to Ersilia!",
    };
  } catch (error) {
    console.error("Error in submitToErsilia:", error);

    return {
      success: false,
      message: "Failed to submit to Ersilia",
    };
  }
}
