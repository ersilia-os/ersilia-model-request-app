import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSubmissionBySlug } from "./actions";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return slug;
}

export default async function SubmissionDetailsPage(props: { params: Params }) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const params = await props.params;
  const slug = params.slug;

  const submissionDetails = await getSubmissionBySlug(slug);

  if (!submissionDetails) return;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white my-10">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-plum mb-3 md:mb-4 text-balance">
            {submissionDetails.title}
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                submissionDetails.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : submissionDetails.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submissionDetails.status}
            </span>
            <span className="text-sm text-gray-500">
              Submitted:{" "}
              {new Date(submissionDetails.submittedDate).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-plum mb-2">
              Description
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {submissionDetails.description}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-plum mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {submissionDetails.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-plum mb-2">License</h2>
            <p className="text-gray-600 text-sm md:text-base">
              {submissionDetails.license}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-plum mb-2">Resources</h2>
            <div className="flex space-x-3">
              <a
                href={submissionDetails.publication}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 text-plum" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-plum">Publication</p>
                  <p className="text-xs text-gray-500 truncate">
                    {submissionDetails.publication}
                  </p>
                </div>
              </a>

              <a
                href={submissionDetails.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Github className="w-5 h-5 text-plum" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-plum">Source Code</p>
                  <p className="text-xs text-gray-500 truncate">
                    {submissionDetails.sourceCode}
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <Link href="/submissions" className="w-full">
              <Button className="w-full font-bold md:py-4 lg:py-5 text-sm md:text-base lg:text-lg bg-plum hover:bg-[#6f3b73] text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                Back to Submissions
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button className="w-full text-black md:py-4 lg:py-5 text-sm md:text-base lg:text-lg bg-transparent hover:bg-gray-100 border-2 border-plum-200 py-3 font-semibold rounded-lg shadow-sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
