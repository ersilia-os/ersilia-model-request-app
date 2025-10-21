import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { alertError } from "@/lib/alerts";
import { extractErrorMessage } from "@/lib/error";
import { useForm } from "react-hook-form";
import { UploadFormSchema } from "@/schema/upload";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function useAiPublicationAnalysis() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof UploadFormSchema>>({
    resolver: zodResolver(UploadFormSchema),
    mode: "onSubmit",
    defaultValues: {
      publication: "",
      question1: "",
      question2: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UploadFormSchema>) => {
    const { publication, question1, question2 } = data;

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

      const metadata = await api.analyzePdf(pdfFile, {
        question1,
        question2,
      });

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
    file,
    setFile,
    onSubmit,
    form,
  };
}
