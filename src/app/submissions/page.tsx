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

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
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
      <DataTableSubmission columns={columns} data={submissions} />
    </div>
  );
}
