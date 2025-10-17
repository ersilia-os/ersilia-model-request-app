import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiAnalysisModelMetadataSchema } from "@/lib/schemas";

type AiAnalysisState =
  | { isLoading: true; aiResults: null }
  | { isLoading: false; aiResults: AiAnalysisModelMetadataSchema };

export function useAiAnalysisResults(): AiAnalysisState {
  const router = useRouter();
  const [state, setState] = useState<AiAnalysisState>({
    isLoading: true,
    aiResults: null,
  });

  useEffect(() => {
    const aiResultsJSON = sessionStorage.getItem("aiAnalysis");

    if (!aiResultsJSON) {
      router.push("/new-model");
      return;
    }

    try {
      const data = JSON.parse(aiResultsJSON);
      setState({ isLoading: false, aiResults: data });
    } catch (err) {
      console.error("Failed to parse AI results:", err);
      router.push("/new-model");
    }
  }, [router]);

  return state;
}
