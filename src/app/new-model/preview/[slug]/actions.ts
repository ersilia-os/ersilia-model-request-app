"use server";

import { getOctokit } from "@/lib/github";
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

export async function createIssue(dataForIssue: {
  title: string;
  body: string;
  owner: string;
  repo: string;
  labels?: string[];
}) {
  try {
    if (!dataForIssue.owner || !dataForIssue.owner || !dataForIssue.repo) {
      return {
        success: false,
        message: "Title, repository name and repository owner are require",
        issue: null,
      };
    }

    const octokit = await getOctokit();

    const { data } = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: dataForIssue.owner,
        repo: dataForIssue.repo,
        title: dataForIssue.title,
        body: dataForIssue.body || "",
        labels: dataForIssue.labels || [],
      }
    );

    return {
      success: true,
      message: "Issue created successfully",
      issue: {
        number: data.number,
        url: data.html_url,
        id: data.id,
        title: data.title,
      },
    };
  } catch (error) {
    console.error("Error creating issue:", error);
    return {
      success: false,
      message: "Issue created successfully",
      issue: null,
    };
  }
}
