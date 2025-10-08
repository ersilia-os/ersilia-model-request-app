import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import SubmissionsList from "@/components/submissions/submissions-list";
import SubmissionsLoading from "@/components/submissions/submissions-loading";

export default async function SubmissionPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Your Submissions
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            View your model submissions
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
            <Link href="/new-model/step/1" className="w-full">
              <Button className="w-full font-bold text-sm md:text-base bg-plum hover:bg-[#6f3b73] text-white px-6 py-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                Add New Model
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button className="w-full text-plum-500 text-sm md:text-base bg-transparent hover:plum/85 border-2 border-plum-200 py-3 font-semibold rounded-lg shadow-sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Suspense fallback={<SubmissionsLoading />}>
            <SubmissionsList sid={session.internal.sid} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
