import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import AdminSubmission from "@/components/admin/AdminSubmission";
import { getSubmissionBySlug } from "../../submissions/[slug]/actions";

type Params = Promise<{ slug: string }>;

export default async function AdminSubmissionPage(props: { params: Params }) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const params = await props.params;
  const submission = await getSubmissionBySlug(params.slug);

  if (!submission) {
    redirect("/admin");
  }

  return <AdminSubmission data={submission} />;
}
