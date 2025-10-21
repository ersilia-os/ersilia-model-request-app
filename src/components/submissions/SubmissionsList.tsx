import Link from "next/link";
import { ModelMetadata } from "../../../generated/prisma";

interface SubmissionsDataProps {
  data: Promise<ModelMetadata[]>;
}

export default async function SubmissionsList({ data }: SubmissionsDataProps) {
  const submissions = await data;
  if (!submissions.length) {
    return (
      <div className="text-center text-plum text-sm md:text-base lg:text-lg mb-2">
        <p className="text-center">You don’t have any submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-3">
      {submissions.map((submission) => (
        <Link key={submission.id} href={`submissions/${submission.slug}`}>
          <div className="border-2 border-plum/20 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-plum text-base md:text-lg">
                  {submission.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Submitted:{" "}
                  {new Date(submission.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    submission.status === "SUBMITTED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
