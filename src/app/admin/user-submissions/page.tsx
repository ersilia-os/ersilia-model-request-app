import { auth0 } from "@/lib/auth0";
import { getPublishingUsers } from "./actions";

import { redirect } from "next/navigation";

import { UserSubmissionsTable } from "@/components/admin/submissions/UserSubmissionsTable";
import { SectionHeader } from "@/components/SectionHeader";
import { columns } from "@/components/admin/submissions/columns";

export default async function AdminUserSumbmissionsPage() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  const auth0Roles = (session.user.ersilia as string[]) || [];
  if (!auth0Roles.includes("admin")) redirect("/");

  const users = await getPublishingUsers();

  const flattenedData = users.flatMap((user) =>
    user.metadataRecords.map((record) => ({
      sub: user.sub,
      email: user.email,
      fileName: record.fileName,
      status: record.status,
      issueNumber: record.ErsiliaIssue?.issueNumber ?? null,
      issueUrl: record.ErsiliaIssue?.issueUrl ?? null,
    }))
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-6">
        <SectionHeader
          title="User Submissions"
          description="View and manage all submissions by users on Ersilia"
        />
        <div className="w-full max-w-7xl">
          <UserSubmissionsTable columns={columns} data={flattenedData} />
        </div>
      </div>
    </div>
  );
}
