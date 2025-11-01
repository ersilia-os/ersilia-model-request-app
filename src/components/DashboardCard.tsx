import { CheckCircle, Clock, FilePlus, FileText } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="*:data-[slot=card]:from-plum/10 dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:to-transparent *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card min-w-[200px]" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Total Submissions</CardDescription>
            <FileText className="text-plum h-4 w-4" />
          </div>
          <CardTitle className="text-plum text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalSubmissions}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card min-w-[200px]" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Draft Models</CardDescription>
            <FilePlus className="text-plum h-4 w-4" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.draftModels}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card min-w-[200px]" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Submitted Models</CardDescription>
            <CheckCircle className="text-plum h-4 w-4" />
          </div>
          <CardTitle className="text-plum text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.submittedModels}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card min-w-[200px]" data-slot="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Last 7 Days</CardDescription>
            <Clock className="text-plum h-4 w-4" />
          </div>
          <CardTitle className="text-plum text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.recentSubmissions7Days}
          </CardTitle>
          <CardDescription className="mt-1 text-xs">
            {stats.recentSubmissions30Days} in last 30 days
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
