import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getSubmissionsByUser } from "./actions";
import { DataTableSubmission } from "@/components/submissions/DataTableSubmission";
import { columns } from "@/components/submissions/columns";

export default async function SubmissionPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const submissions = await getSubmissionsByUser(session.user.sub);

  return (
    <div className="flex flex-col space-y-3 items-center min-h-[calc(100vh-70px-50px)] bg-white my-6">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
          Your Submissions
        </h1>
        <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
          View your model submissions
        </p>
      </div>

      <DataTableSubmission columns={columns} data={submissions} />

      <div className="flex items-center gap-2 sm:gap-6 mb-10 mt-4">
        <Link href="/">
          <Button variant={"transparent"} className="px-7 sm:px-20">
            Back to Home
          </Button>
        </Link>

        <Link href="/new-model">
          <Button variant={"plum"} className="px-7 sm:px-20">
            Add New Model
          </Button>
        </Link>
      </div>
    </div>
  );
}
