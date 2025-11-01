import { redirect } from "next/navigation";

import { Card, CardHeader } from "@/components/ui/card";

import { getSubmissionAndIssue } from "./actions";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return slug;
}

export default async function ThankYouPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  const submission = await getSubmissionAndIssue(slug);

  if (!submission.success || !submission.data) {
    redirect("/");
  }

  const issueUrl = submission.data.ErsiliaIssue?.issueUrl;

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center bg-white">
      <Card className="w-full border-none text-center shadow-none">
        <CardHeader className="mb-4 p-0">
          <h2 className="text-plum mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
            Thank you!
          </h2>
          <p className="mb-2 text-sm text-gray-400 md:text-base lg:text-lg">
            Your model has been successfully submitted.
          </p>
          {issueUrl && (
            <p className="text-xs text-gray-400 md:text-sm">
              You can track your submission here: <br />
              <a
                href={issueUrl}
                target="_blank"
                className="text-plum underline">
                {issueUrl}
              </a>
            </p>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}
