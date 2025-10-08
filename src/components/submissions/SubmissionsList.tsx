import { getSubmissionsByUser } from "@/app/submissions/actions";
import Link from "next/link";

export default async function SubmissionsList({ sid }: { sid: string }) {
  const submissionsList = await getSubmissionsByUser(sid);

  return (
    <div className="space-y-3 mb-6">
      {submissionsList.map((submission) => (
        <div
          key={submission.id}
          className="border-2 border-plum-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <Link href={`/submissions/${submission.slug}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-plum text-base md:text-lg">
                  {submission.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Submitted: {submission.submittedDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    submission.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : submission.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
