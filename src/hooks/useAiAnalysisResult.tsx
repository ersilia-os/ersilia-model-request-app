// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// import { alertError } from "@/lib/alerts";
// import { AiAnalysisModelMetadataSchema } from "@/schema/ai-response-schema";
// import { getModelMetadatById } from "@/app/new-model/metadata/[slug]/actions";

// type AiAnalysisState =
//   | { isLoading: true; aiResults: null }
//   | { isLoading: false; aiResults: AiAnalysisModelMetadataSchema };

// export function useAiAnalysisResults(): AiAnalysisState {
//   const router = useRouter();
//   const [state, setState] = useState<AiAnalysisState>({
//     isLoading: true,
//     aiResults: null,
//   });

//   useEffect(() => {
//     const resultId = sessionStorage.getItem("modelId");

//     if (!resultId) {
//       router.push("/new-model");
//       return;
//     }

//     try {
//       const id = JSON.parse(resultId);

//       setState({ isLoading: false, aiResults: data });
//     } catch (err) {
//       console.error(err);

//       router.push("/new-model");
//       alertError("Error generating report. Please try again.");
//     }
//   }, [router]);

//   return state;
// }
