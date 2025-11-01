import Link from "next/link";
import { redirect } from "next/navigation";

import { BiomedicalAreaSection } from "@/components/BiomedicalAreaSection";
import { DeploymentInfoSection } from "@/components/DeployementSection";
import { DescriptionSection } from "@/components/DescriptionSection";
import { InputOutputSection } from "@/components/InputOutputSection";
import { InterpretationSection } from "@/components/InterpretationSection";
import MetadataHeader from "@/components/MetadataHeader";
import { ResourcesSection } from "@/components/RessoucesSection";
import { TagsSection } from "@/components/TagsSection";
import { TargetOrganismSection } from "@/components/TargetSection";
import { TaskSection } from "@/components/TasksSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { getSubmissionBySlug } from "./actions";

type Params = Promise<{ slug: string }>;

export default async function SubmissionDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  const submission = await getSubmissionBySlug(slug);

  if (!submission) {
    redirect("/submissions");
  }

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="space-y-8">
        <MetadataHeader
          title={submission.title}
          status={submission.status}
          updatedAt={submission.updatedAt}
          gihublink={submission.ErsiliaIssue?.issueUrl}
          slug={submission.slug}
        />

        <Separator />
        <DescriptionSection description={submission.description} />

        <InterpretationSection interpretation={submission.interpretation} />
        <Separator />
        <TagsSection tags={submission.tags} />
        <Separator />
        <TaskSection task={submission.task} subtask={submission.subtask} />
        <Separator />
        <InputOutputSection
          input={submission.input}
          inputDimension={submission.inputDimension}
          output={submission.output}
          outputDimension={submission.outputDimension}
          outputConsistency={submission.outputConsistency}
        />
        <Separator />
        <BiomedicalAreaSection biomedicalArea={submission.biomedicalArea} />
        <Separator />
        <TargetOrganismSection targetOrganism={submission.targetOrganism} />
        <Separator />
        <DeploymentInfoSection
          deployment={submission.deployment}
          license={submission.license}
          publicationYear={submission.publicationYear}
        />
        <Separator />
        <ResourcesSection
          publicationUrl={submission.publicationUrl}
          publicationType={submission.publicationType}
          sourceUrl={submission.sourceUrl}
          sourceType={submission.sourceType}
        />
        <Separator />
        {submission.isContributor && (
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
        <div className="flex w-full justify-end">
          {submission.status === "DRAFT" && (
            <Link href={`/new-model/metadata/${submission.slug}`}>
              <Button
                type="button"
                variant="transparent"
                className="w-full text-xs sm:text-base">
                Edit Metadata
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
