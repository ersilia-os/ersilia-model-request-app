import { redirect } from "next/navigation";

import { PlusCircle } from "lucide-react";

import { DashboardCard } from "@/components/DashboardCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth0";

import { getUserWithStats } from "./actions";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { stats } = await getUserWithStats(session);

  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="space-y-6">
        <div className="space-between flex">
          <SectionHeader
            title="Welcome to Ersilia!"
            description="Get started by adding a new model or viewing your previous
          submissions."
          />
          <Button variant="plum">
            <PlusCircle />
            Add Model
          </Button>
        </div>
        <DashboardCard stats={stats} />
      </div>
    </div>
  );
}
