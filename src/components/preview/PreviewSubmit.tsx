"use client";

import { ModelMetadata } from "../../../generated/prisma";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSubmitToErsilia } from "@/hooks/useSubmitToErsilia";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MetadataHeader from "../MetadataHeader";
import { DescriptionSection } from "../DescriptionSection";
import { InterpretationSection } from "../InterpretationSection";
import { TagsSection } from "../TagsSection";
import { TaskSection } from "../TasksSection";
import { InputOutputSection } from "../InputOutputSection";
import { BiomedicalAreaSection } from "../BiomedicalAreaSection";
import { TargetOrganismSection } from "../TargetSection";
import { DeploymentInfoSection } from "../DeployementSection";
import { ResourcesSection } from "../RessoucesSection";
import { Loader2 } from "lucide-react";

interface PreviewSubmitProps {
  data: ModelMetadata;
}

export default function PreviewSubmit({ data }: PreviewSubmitProps) {
  const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  const router = useRouter();
  const [confirmStep, setConfirmStep] = useState(false);
  const { submitMetadata, loading } = useSubmitToErsilia({
    owner,
    repo,
  });

  async function handleSend() {
    if (!confirmStep) {
      setConfirmStep(true);

      setTimeout(() => setConfirmStep(false), 3000);
      return;
    }

    const result = await submitMetadata(data.id, data.isContributor);

    if (result.success) {
      setConfirmStep(false);
      setTimeout(() => {
        router.push(`/thank-you/${data.slug}`);
      }, 4000);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 sm:mb-6">
          <MetadataHeader
            title={data.title}
            status={data.status}
            updatedAt={data.updatedAt}
          />
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <Separator />
          <DescriptionSection description={data.description} />
          <Separator />
          <InterpretationSection interpretation={data.interpretation} />
          <Separator />
          <TagsSection tags={data.tags} />
          <Separator />
          <TaskSection task={data.task} subtask={data.subtask} />
          <Separator />
          <InputOutputSection
            input={data.input}
            inputDimension={data.inputDimension}
            output={data.output}
            outputDimension={data.outputDimension}
            outputConsistency={data.outputConsistency}
          />
          <Separator />
          <BiomedicalAreaSection biomedicalArea={data.biomedicalArea} />
          <Separator />
          <TargetOrganismSection targetOrganism={data.targetOrganism} />
          <Separator />
          <DeploymentInfoSection
            deployment={data.deployment}
            license={data.license}
            publicationYear={data.publicationYear}
          />
          <Separator />
          <ResourcesSection
            publicationUrl={data.publicationUrl}
            publicationType={data.publicationType}
            sourceUrl={data.sourceUrl}
            sourceType={data.sourceType}
          />
          <Separator />
          {data.isContributor && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Contribution
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  You will be listed as a contributor with your Github Account
                </p>
              </div>
              <Separator />
            </>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link
              href={`/new-model/metadata/${data.slug}`}
              className="w-full sm:flex-1"
            >
              <Button
                type="button"
                variant="transparent"
                className="text-xs sm:text-base w-full"
                disabled={loading || data.status === "SUBMITTED"}
              >
                Edit Metadata
              </Button>
            </Link>

            <Button
              variant={"plum"}
              className="text-xs sm:text-base w-full sm:flex-1"
              onClick={handleSend}
              disabled={loading || data.status === "SUBMITTED"}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2 text-xs sm:text-sm" />
                  Sending...
                </>
              ) : confirmStep ? (
                "Click again to confirm"
              ) : (
                "Send to Ersilia"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
