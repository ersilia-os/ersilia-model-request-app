"use client";

import { Button } from "@/components/ui/button";
import PublicationInput from "@/components/new-model/PublicationInput";
import FileDrop from "@/components/new-model/FileDrop";

import { useAiPublicationAnalysis } from "@/hooks/usePublicationAnalysis";
import { Separator } from "@/components/ui/separator";
import ContextInput from "@/components/new-model/ContextInput";
import CustomSeparator from "@/components/CustomSeparator";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  FileUp,
  Lightbulb,
  MessageCircleWarningIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function NewModelPage() {
  const { file, setFile, form, onSubmit } = useAiPublicationAnalysis();

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-8">
        <SectionHeader
          title="Add New Model to Ersilia"
          description="Provide a publication and answer a few questions to help our AI extract accurate model metadata"
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
          <aside className="lg:w-80 space-y-4">
            <Card className="bg-linear-to-t from-plum/10 to-transparent border-plum/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-plum text-lg">
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

            <Card className="bg-linear-to-t from-plum/10 to-transparent border-plum/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-plum text-lg">
                  <Lightbulb className="h-5 w-5" />
                  How does it work?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <FileUp className="h-5 w-5 text-plum shrink-0 mt-0.5" />
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
                  <MessageSquare className="h-5 w-5 text-plum shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Add Context</p>
                    <p className="text-xs text-gray-600">
                      Answer questions about the model
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-plum shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">AI Analysis</p>
                    <p className="text-xs text-gray-600">
                      Automatic metadata extraction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-plum shrink-0 mt-0.5" />
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

          <div className="flex-1 lg:max-w-3xl ">
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
      </div>
    </div>
  );
}
