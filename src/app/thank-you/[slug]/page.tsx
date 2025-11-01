import Link from "next/link";
import { redirect } from "next/navigation";
import { getSubmissionAndIssue } from "./actions";
import { Card, CardHeader } from "@/components/ui/card";

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
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-white">
      <Card className="w-full border-none shadow-none text-center">
        <CardHeader className="p-0 mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Thank you!
          </h2>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            Your model has been successfully submitted.
          </p>
          {issueUrl && (
            <p className="text-gray-400 text-xs md:text-sm">
              You can track your submission here: <br />
              <a
                href={issueUrl}
                target="_blank"
                className="text-plum underline"
              >
                {issueUrl}
              </a>
            </p>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}
