"use server";

import { userData } from "../mock-data";

export async function getSubmissionBySlug(slug: string) {
  const submissionDetails = userData.submissions.find(
    (submission) => submission.slug === slug
  );

  return submissionDetails;
}
