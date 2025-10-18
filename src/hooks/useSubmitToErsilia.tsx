import { useState } from "react";
import { ModelMetadata } from "../../generated/prisma";
import formatMetadataBody from "@/lib/utils";
import { createIssue } from "@/app/new-model/preview/[slug]/actions";

interface UseSubmitMetadataOptions {
  owner: string;
  repo: string;
}

export function useSubmitMetadata({ owner, repo }: UseSubmitMetadataOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [issueUrl, setIssueUrl] = useState("");

  async function submitMetadata(data: ModelMetadata) {
    setLoading(true);
    setError("");
    setSuccess(false);
    setIssueUrl("");

    const issueBody = formatMetadataBody(data);

    const result = await createIssue({
      title: `🦠 Model Request: ${data.title}`,
      body: issueBody,
      owner,
      repo,
    });

    if (result.success && result.issue) {
      setSuccess(true);
      setIssueUrl(result.issue.url);
    } else {
      const errorMessage = result.message;
      setError(errorMessage);
    }
    setLoading(false);
  }
  return { submitMetadata, loading, error, success, issueUrl };
}
