import { auth0 } from "@/lib/auth0";
import { getPublishingUsers } from "./actions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UserList from "@/components/admin/UserList";
import { redirect } from "next/navigation";
export default async function AdminDashboardPage() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  const users = await getPublishingUsers();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Admin
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            View user&apos;s submissions
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <UserList data={users} />
        </CardContent>
      </Card>
    </div>
  );
}
