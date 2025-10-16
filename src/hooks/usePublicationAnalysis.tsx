import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export function useAiPublicationAnalysis() {
  const router = useRouter();
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !publication) {
      alert("Please upload a PDF or provide a publication link.");
      return;
    }

    sessionStorage.removeItem("aiAnalysis");
    router.push("/new-model/processing");

    try {
      let pdfFile: File | null = file;

      if (!pdfFile && publication) {
        pdfFile = (await api.downloadPdfFromUrl(publication)) || null;
      }

      if (!pdfFile) {
        throw new Error("No file available for analysis");
      }

      const metadata = await api.analyzePdf(pdfFile);
      sessionStorage.setItem("aiAnalysis", JSON.stringify(metadata));
    } catch (err) {
      console.error(err);

      router.push("/new-model");
      alert("Error generating report. Please try again.");
    }
  };

  return {
    publication,
    setPublication,
    file,
    setFile,
    handleSubmit,
  };
}
