"use client";

import { useEffect, useState } from "react";
import ModelMetadataForm from "@/components/model-form/modelform";
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
    <main className="flex min-h-screen items-center justify-center bg-white py-10">
      <Card className="w-full max-w-4xl border-2 border-plum rounded-2xl shadow-xl p-6 md:p-10">
        <CardHeader className="p-0 mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Model Metadata
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Prefilled based on the extracted report
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <ModelMetadataForm report={report} />
        </CardContent>
      </Card>
    </main>
  );
}