import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, FilePlus, CheckCircle, Clock } from "lucide-react";

interface DashboardCardProps {
  stats: {
    totalSubmissions: number;
    draftModels: number;
    submittedModels: number;
    recentSubmissions7Days: number;
    recentSubmissions30Days: number;
  };
}

export function DashboardCard({ stats }: DashboardCardProps) {
  return (
    <div className="*:data-[slot=card]:from-ersilia *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Total Submissions</CardDescription>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalSubmissions}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Draft Models</CardDescription>
            <FilePlus className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.draftModels}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Submitted Models</CardDescription>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.submittedModels}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Last 7 Days</CardDescription>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.recentSubmissions7Days}
          </CardTitle>
          <CardDescription className="text-xs mt-1">
            {stats.recentSubmissions30Days} in last 30 days
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
