import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getUserWithStats } from "./actions";
import { DashboardCard } from "@/components/DashboardCard";
import { SectionHeader } from "@/components/SectionHeader";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { stats } = await getUserWithStats(session);

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-6">
        <SectionHeader
          title="Welcome to Ersilia!"
          description="Get started by adding a new model or viewing your previous
          submissions."
        />
        <DashboardCard stats={stats} />
      </div>
    </div>
  );
}
