import { redirect } from "next/navigation";

import PreviewSubmit from "@/components/preview/PreviewSubmit";

import { getSubmissionBySlug } from "./actions";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return slug;
}

export default async function PreviewPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  const submission = await getSubmissionBySlug(slug);

  if (!submission.success || !submission.data) {
    redirect("/new-model/metadata");
  }

  return <PreviewSubmit data={submission.data} />;
}
