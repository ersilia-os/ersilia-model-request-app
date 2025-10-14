import { ModelMetadata } from "@/lib/schemas";

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
    } catch (error) {
      console.error(error);
      alert("Error downloading the publication");
    }
  },

  async analyzePdf(file: File): Promise<ModelMetadata> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/analysis", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    console.log("Analysis response:", res.status, data);

    if (!res.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    return data as ModelMetadata;
  },
};

export default api;
