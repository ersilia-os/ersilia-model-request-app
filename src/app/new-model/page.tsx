"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicationInput from "@/components/new-model/PublicationInput";
import FileDrop from "@/components/new-model/FileDrop";

import { useAiPublicationAnalysis } from "@/hooks/usePublicationAnalysis";
import { Separator } from "@/components/ui/separator";
import ContextInput from "@/components/new-model/ContextInput";
import CustomSeparator from "@/components/CustomSeparator";
import { SectionHeader } from "@/components/SectionHeader";

export default function NewModelPage() {
  const { file, setFile, form, onSubmit } = useAiPublicationAnalysis();

  return (
    <div className="space-y-8 px-6">
      <SectionHeader
        title="Add New Model to Ersilia"
        description="Provide a publication and answer a few questions to help our AI extract accurate model metadata"
      />

      <div className="max-w-5xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 p-0">
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
            <div className="flex justify-end w-full mt-2">
              <Button
                type="submit"
                variant="plum"
                className="w-full sm:w-auto sm:px-12"
              >
                Analyze
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
