import Link from "next/link";
import { redirect } from "next/navigation";
import { getSubmissionAndIssue } from "./actions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center justify-center h-[calc(100vh-70px-2px)] bg-white">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10 text-center">
        <CardHeader className="p-0 mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Thank you!
          </h1>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            Your model has been successfully submitted.
          </p>
          {issueUrl && (
            <p className="text-gray-400 text-xs md:text-sm">
              You can track your submission here: <br />
              <Link
                href={issueUrl}
                target="_blank"
                className="text-plum underline"
              >
                {issueUrl}
              </Link>
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-3 p-0 flex flex-col items-center">
          <Link href="/submissions" className="w-2/3">
            <Button variant={"plum"} className="w-full">
              View All Submissions
            </Button>
          </Link>

          <Link href="/" className="w-2/3">
            <Button variant={"transparent"} className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
