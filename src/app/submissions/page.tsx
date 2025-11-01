import { redirect } from "next/navigation";

import { SectionHeader } from "@/components/SectionHeader";
import { DataTableSubmission } from "@/components/submissions/DataTableSubmission";
import { columns } from "@/components/submissions/columns";
import { auth0 } from "@/lib/auth0";

import { getSubmissionsByUser } from "./actions";

export default async function SubmissionPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const submissions = await getSubmissionsByUser(session.user.sub);

  return (
    <div className="mx-auto w-full max-w-7xl px-6">
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
