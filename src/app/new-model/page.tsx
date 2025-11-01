"use client";

import {
  CheckCircle2,
  FileUp,
  Lightbulb,
  MessageCircleWarningIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import CustomSeparator from "@/components/CustomSeparator";
import { SectionHeader } from "@/components/SectionHeader";
import ContextInput from "@/components/new-model/ContextInput";
import FileDrop from "@/components/new-model/FileDrop";
import PublicationInput from "@/components/new-model/PublicationInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAiPublicationAnalysis } from "@/hooks/usePublicationAnalysis";

export default function NewModelPage() {
  const { file, setFile, form, onSubmit } = useAiPublicationAnalysis();

  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="space-y-8">
        <SectionHeader
          title="Add New Model to Ersilia"
          description="Provide a publication and answer a few questions to help our AI extract accurate model metadata"
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
          <aside className="space-y-4 lg:w-80">
            <Card className="from-plum/10 border-plum/20 bg-linear-to-t to-transparent">
              <CardHeader>
                <CardTitle className="text-plum flex items-center gap-2 text-lg">
                  <MessageCircleWarningIcon className="h-5 w-5" />
                  Help Our AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p className="font-medium">
                  Answer each question carefully and thoroughly.
                </p>
                <p>
                  Your detailed responses help our AI extract more accurate
                  metadata from the publication. The more context you provide,
                  the better the results.
                </p>
              </CardContent>
            </Card>

            <Card className="from-plum/10 border-plum/20 bg-linear-to-t to-transparent">
              <CardHeader>
                <CardTitle className="text-plum flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5" />
                  How does it work?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <FileUp className="text-plum mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Upload Publication
                    </p>
                    <p className="text-xs text-gray-600">
                      Provide a URL or PDF file
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="text-plum mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Add Context</p>
                    <p className="text-xs text-gray-600">
                      Answer questions about the model
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="text-plum mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">AI Analysis</p>
                    <p className="text-xs text-gray-600">
                      Automatic metadata extraction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-plum mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Review & Submit</p>
                    <p className="text-xs text-gray-600">
                      Edit and finalize your submission
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1 lg:max-w-3xl">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4">
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
                <div className="mt-2 flex w-full justify-end">
                  <Button
                    type="submit"
                    variant="plum"
                    className="w-full sm:w-auto sm:px-12">
                    Analyze
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
