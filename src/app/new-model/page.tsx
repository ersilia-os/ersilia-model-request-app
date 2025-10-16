"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicationInput from "@/components/new-model/PublicationInput";
import FileDrop from "@/components/new-model/FileDrop";

import { useModelSubmission } from "@/hooks/useModelSubmission";

export default function NewModelPage() {
  const {
    publication,
    setPublication,
    file,
    setFile,
    isLoading,
    handleSubmit,
  } = useModelSubmission();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Add New Model to Ersilia
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            Provide a publication to extract model metadata
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CardContent className="flex flex-col gap-4 p-0">
            <PublicationInput
              publication={publication}
              setPublication={setPublication}
              disabled={!!file}
            />

            <FileDrop
              file={file}
              publication={publication}
              onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
              onRemoveFile={() => setFile(null)}
            />

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Button
                asChild
                variant="transparent"
                className="w-full sm:flex-1"
              >
                <Link href="/">Back to Home</Link>
              </Button>

              <Button
                type="submit"
                variant="plum"
                disabled={isLoading || (!file && !publication)}
                className="w-full sm:flex-1"
              >
                {isLoading ? "Uploading..." : "Analyse"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

// https://www.nature.com/articles/s41467-025-62717-7.pdf
