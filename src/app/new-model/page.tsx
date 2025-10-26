"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicationInput from "@/components/new-model/PublicationInput";
import FileDrop from "@/components/new-model/FileDrop";

import { useAiPublicationAnalysis } from "@/hooks/usePublicationAnalysis";
import { Separator } from "@/components/ui/separator";
import ContextInput from "@/components/new-model/ContextInput";
import CustomSeparator from "@/components/CustomSeparator";

export default function NewModelPage() {
  const { file, setFile, form, onSubmit } = useAiPublicationAnalysis();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Add New Model to Ersilia
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            Provide a publication and answer a few questions to help our AI
            extract accurate model metadata
          </p>
        </CardHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CardContent className="flex flex-col gap-4 p-0">
            <PublicationInput control={form.control} disabled={!!file} />
            <CustomSeparator word="OR" />
            <FileDrop
              file={file}
              publication={form.watch("publication")}
              onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
              onRemoveFile={() => setFile(null)}
            />
            <Separator />
            <ContextInput control={form.control} />
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">

              <Button
                type="submit"
                variant="plum"
                className="w-full sm:flex-1"
                // disabled={!file && !form.watch("publication")}
              >
                Analyze
              </Button>
              
              <Button
                asChild
                variant="transparent"
                className="w-full sm:flex-1"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
