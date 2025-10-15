import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ModelMetadata } from "@/lib/schemas";

export function useModelSubmission() {
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !publication) {
      alert("Please upload a PDF or provide a publication link.");
      return;
    }

    setIsLoading(true);

    try {
      let pdfFile: File | null = file;

      if (!pdfFile && publication) {
        const downloadedFile = await api.downloadPdfFromUrl(publication);
        if (!downloadedFile) {
          setIsLoading(false);
          return;
        }
        pdfFile = downloadedFile;
      }

      if (!pdfFile) {
        throw new Error("No file available for analysis");
      }

      // Upload PDF to Google Drive
      const driveFileId = await api.uploadToGoogleDrive(pdfFile);
      console.log("Uploaded to Drive:", driveFileId);

      const metadata: ModelMetadata = await api.analyzePdf(pdfFile);

      // Optionally add the Drive file ID to metadata
      // const metadataWithDrive = {
      //   ...metadata,
      //   driveFileId,
      // };

      sessionStorage.setItem("modelMetadata", JSON.stringify(metadata));

      router.push("/new-model/processing");
    } catch (err) {
      console.error(err);
      alert("Error generating report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    publication,
    setPublication,
    file,
    setFile,
    isLoading,
    handleSubmit,
  };
}
