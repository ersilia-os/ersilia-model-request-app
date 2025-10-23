import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SubmissionsLoading from "@/components/submissions/SubmissionsLoading";
import SubmissionsList from "@/components/submissions/SubmissionsList";
import { getSubmissionsByUser } from "./actions";

export default async function SubmissionPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const submissions = getSubmissionsByUser(session.user.sub);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Your Submissions
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            View your model submissions
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
            <Link href="/" className="w-full">
              <Button variant={"transparent"} className="w-full">
                Back to Home
              </Button>
            </Link>

            <Link href="/new-model" className="w-full">
              <Button variant={"plum"} className="w-full">
                Add New Model
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Suspense fallback={<SubmissionsLoading />}>
            <SubmissionsList data={submissions} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
