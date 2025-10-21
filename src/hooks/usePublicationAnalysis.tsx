import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { alertError } from "@/lib/alerts";
import { extractErrorMessage } from "@/lib/error";

export function useAiPublicationAnalysis() {
  const router = useRouter();
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !publication) {
      alertError("Please upload a PDF or provide a publication link.");
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

      // Upload PDF to Google Drive
      // const driveFileId = await api.uploadToGoogleDrive(pdfFile);
      // console.log("Uploaded to Drive:", driveFileId);

      const metadata = await api.analyzePdf(pdfFile);

      // add the Drive file ID to metadata
      // const metadataWithDrive = {
      //   ...metadata,
      //   driveFileId,
      // };

      sessionStorage.setItem("aiAnalysis", JSON.stringify(metadata));
    } catch (err: unknown) {
      console.error(err);

      router.push("/new-model");

      const message = extractErrorMessage(
        err,
        "Error generating report. Please try again."
      );

      alertError(message);
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
