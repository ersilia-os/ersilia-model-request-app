import { redirect } from "next/navigation";
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

  return <div>TODO with CONFETTI {submission.data.ErsiliaIssue?.issueUrl}</div>;
}
