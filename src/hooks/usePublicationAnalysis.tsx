import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { alertError } from "@/lib/alerts";
import { extractErrorMessage } from "@/lib/error";
import { useForm } from "react-hook-form";
import { UploadFormSchema } from "@/schema/upload-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewModelMetadata } from "@/app/new-model/actions";

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

    localStorage.removeItem("slug");
    router.push("/new-model/processing");

    try {
      let pdfFile: File | null = file;

      if (!pdfFile && publication) {
        pdfFile = (await api.downloadPdfFromUrl(publication)) || null;
      }

      if (!pdfFile) {
        throw new Error("No file available for analysis");
      }

      const pdfInGDrive = await api.uploadToGoogleDrive(pdfFile);

      if (!pdfInGDrive) {
        throw new Error("Something went wrong, please try again");
      }

      const metadata = await api.analyzePdf(pdfFile, {
        question1,
        question2,
      });

      const result = await addNewModelMetadata(metadata, pdfInGDrive);

      if (!result.success || !result.data) {
        throw new Error(result.error);
      }
      localStorage.setItem("slug", JSON.stringify(result.data.slug));
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
