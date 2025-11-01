import { auth0 } from "@/lib/auth0";

import { redirect } from "next/navigation";

import { SectionHeader } from "@/components/SectionHeader";

import { getAllUsers } from "./actions";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { columns } from "@/components/admin/users/columns";

export default async function AdminUsersPage() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  const auth0Roles = (session.user.ersilia as string[]) || [];
  if (!auth0Roles.includes("admin")) redirect("/");

  const usersData = await getAllUsers();

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-6">
        <SectionHeader
          title="User Submissions"
          description="View and manage all submissions by users on Ersilia"
        />
        <div className="w-full max-w-7xl">
          <UsersTable columns={columns} data={usersData} />
        </div>
      </div>
    </div>
  );
}
