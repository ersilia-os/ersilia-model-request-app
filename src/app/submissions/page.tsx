import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getSubmissionsByUser } from "./actions";
import { DataTableSubmission } from "@/components/submissions/DataTableSubmission";
import { columns } from "@/components/submissions/columns";
import { SectionHeader } from "@/components/SectionHeader";

export default async function SubmissionPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const submissions = await getSubmissionsByUser(session.user.sub);

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-6">
        <SectionHeader
          title="List of all your submissions"
          description="View and manage your model submissions"
        />
        <DataTableSubmission columns={columns} data={submissions} />
      </div>
    </div>
  );
}
