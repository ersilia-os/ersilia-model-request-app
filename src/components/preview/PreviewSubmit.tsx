"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Loader2 } from "lucide-react";

import { useSubmitToErsilia } from "@/hooks/useSubmitToErsilia";

import { ModelMetadata } from "../../../generated/prisma";
import { BiomedicalAreaSection } from "../BiomedicalAreaSection";
import { DeploymentInfoSection } from "../DeployementSection";
import { DescriptionSection } from "../DescriptionSection";
import { InputOutputSection } from "../InputOutputSection";
import { InterpretationSection } from "../InterpretationSection";
import MetadataHeader from "../MetadataHeader";
import { ResourcesSection } from "../RessoucesSection";
import { TagsSection } from "../TagsSection";
import { TargetOrganismSection } from "../TargetSection";
import { TaskSection } from "../TasksSection";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface PreviewSubmitProps {
  data: ModelMetadata;
}

export default function PreviewSubmit({ data }: PreviewSubmitProps) {
  const owner = "arobri67";
  const repo = "testerbot";

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
    <div className="mx-auto max-w-7xl px-6">
      <div className="space-y-8">
        <MetadataHeader
          title={data.title}
          status={data.status}
          updatedAt={data.updatedAt}
          slug={data.slug}
        />

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
              <h2 className="text-plum mb-2 text-lg font-semibold">
                Contribution
              </h2>
              <p className="text-sm text-gray-600 md:text-base">
                You will be listed as a contributor with your Github Account
              </p>
            </div>
            <Separator />
          </>
        )}
        <div className="flex w-full justify-end space-x-2">
          <Link href={`/new-model/metadata/${data.slug}`}>
            <Button
              type="button"
              variant="transparent"
              className="w-full text-xs sm:text-base"
              disabled={loading || data.status === "SUBMITTED"}>
              Edit Metadata
            </Button>
          </Link>
          <Button
            variant={"plum"}
            className="text-xs sm:text-base"
            onClick={handleSend}
            disabled={loading || data.status === "SUBMITTED"}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-xs sm:text-sm" />
                Sending...
              </>
            ) : confirmStep ? (
              "Click again to confirm"
            ) : (
              "Send to Ersilia"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
