"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ModelMetadataForm from "@/components/metadata/ModelMetadataForm";
import { useAiAnalysisResults } from "@/hooks/useAiAnalysisResult";
import { SpinnerEmpty } from "@/components/processing/processing";

export default function ModelMetadataFormPage() {
  const { aiResults, isLoading } = useAiAnalysisResults();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <SpinnerEmpty />
        <p className="text-gray-600 text-center">Loading metadata...</p>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full border-2 border-plum rounded-2xl shadow-xl p-6 md:p-10">
        <CardHeader className="p-0 mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            New Model Metadata
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            Carefully review the pre-filled metadata. This information is
            crucial for successful Ersilia Hub integration.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <ModelMetadataForm aiResults={aiResults} />
        </CardContent>
      </Card>
    </main>
  );
}
