"use client";

import { useEffect, useState } from "react";
import ModelMetadataForm from "@/components/model-form/modelform";
import ModelForm2 from "@/components/model-form/ModelForm2";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Page() {
  const [report, setReport] = useState<string | null>(null);

  useEffect(() => {
    const savedReport = sessionStorage.getItem("generatedReport");
    if (savedReport) {
      setReport(savedReport);
    } else {
      window.location.href = "/new-model";
    }
  }, []);

  if (!report) return null;

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
          <ModelMetadataForm report={report} />
        </CardContent>
      </Card>
    </main>
  );
}
