import { AiAnalysisModelMetadataSchema } from "@/lib/schemas";
import { extractErrorMessage } from "@/lib/error";
import { alertError } from "@/lib/alerts";

const api = {
  async downloadPdfFromUrl(url: string): Promise<File | undefined> {
    try {
      const apiUrl = `/api/download-pdf?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to download PDF from URL");
      }

      const blob = await response.blob();

      const urlParts = url.split("/");
      const filename = urlParts[urlParts.length - 1].includes(".pdf")
        ? urlParts[urlParts.length - 1]
        : "publication.pdf";

      const file = new File([blob], filename, { type: "application/pdf" });

      return file;
    } catch (error: unknown) {
      console.error(error);
      alertError(
        extractErrorMessage(error, "Error downloading the publication")
      );
    }
  },

  async analyzePdf(file: File): Promise<AiAnalysisModelMetadataSchema> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/analysis", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    return data;
  },

  uploadToGoogleDrive: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload to Google Drive");
    }

    const data = await response.json();
    return data.fileId;
  },
};

export default api;
