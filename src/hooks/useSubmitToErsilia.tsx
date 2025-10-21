import { submitToErsilia } from "@/app/new-model/preview/[slug]/actions";
import { useState } from "react";

interface UseSubmitMetadataOptions {
  owner: string | undefined;
  repo: string | undefined;
}

export function useSubmitToErsilia({ owner, repo }: UseSubmitMetadataOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submitMetadata(submissionId: string) {
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!owner || !repo) {
      setError("GitHub configuration is incomplete");
      setLoading(false);
      return {
        success: false,
        message: "GitHub configuration is incomplete",
      };
    }

    const result = await submitToErsilia(submissionId, { owner, repo });

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }

    setLoading(false);
    return result;
  }

  return { submitMetadata, loading, error, success };
}
