type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return slug;
}

export default async function SubmissionDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return <div>{slug}</div>;
}
