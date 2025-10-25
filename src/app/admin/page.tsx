import { auth0 } from "@/lib/auth0";
import { getPublishingUsers } from "./actions";

import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/admin/columns";
import { DataTableAdmin } from "@/components/admin/DataTableAdmin";

export default async function AdminDashboardPage() {
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
    <div className="flex flex-col space-y-3 items-center min-h-[calc(100vh-70px-50px)] bg-white my-6">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
          Admin dashboard
        </h1>
        <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
          View all submissions on Ersilia
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
        <Link href="/" className="w-full">
          <Button variant={"transparent"} className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-5xl">
        <DataTableAdmin columns={columns} data={flattenedData} />
      </div>
    </div>
  );
}
