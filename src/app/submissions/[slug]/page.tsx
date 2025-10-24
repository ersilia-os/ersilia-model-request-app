import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSubmissionBySlug } from "./actions";

import { FileText, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import MetadataHeader from "@/components/MetadataHeader";
import { DescriptionSection } from "@/components/DescriptionSection";
import { InterpretationSection } from "@/components/InterpretationSection";
import { TagsSection } from "@/components/TagsSection";
import { TaskSection } from "@/components/TasksSection";
import { InputOutputSection } from "@/components/InputOutputSection";
import { BiomedicalAreaSection } from "@/components/BiomedicalAreaSection";
import { TargetOrganismSection } from "@/components/TargetSection";
import { DeploymentInfoSection } from "@/components/DeployementSection";
import { ResourcesSection } from "@/components/RessoucesSection";

type Params = Promise<{ slug: string }>;

export default async function SubmissionDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  const submission = await getSubmissionBySlug(slug);

  if (!submission) {
    redirect("/submissions");
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <MetadataHeader
            title={submission.title}
            status={submission.status}
            updatedAt={submission.updatedAt}
            gihublink={submission.ErsiliaIssue?.issueUrl}
          />
        </CardHeader>

        <CardContent className="p-0 space-y-6">
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
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Contribution
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                You will be listed as a contributor with your Github Account
              </p>
            </div>
          )}
          <Separator />
          <div className="space-x-3">
            {submission.status === "DRAFT" && (
              <Link href={`/new-model/metadata/${submission.slug}`}>
                <Button type="button" variant="edit" className="text-base">
                  Edit Metadata
                </Button>
              </Link>
            )}
            <Link href="/submissions">
              <Button type="button" variant="transparent" className="text-base">
                Back to Submissions
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
