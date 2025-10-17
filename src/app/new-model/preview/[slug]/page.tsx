import PreviewSubmit from "@/components/metadata/PreviewSubmit";
import { getSubmissionBySlug } from "./actions";
import { redirect } from "next/navigation";


type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return slug;
}

export default async function PreviewPage(props: { params: Params }) {

  const params = await props.params;
  const slug = params.slug;

  const data = await getSubmissionBySlug(slug)

  if (!data || 'message' in data) {
    redirect("/new-model/metadata");
  }


  return <PreviewSubmit data={data}/>;
}
