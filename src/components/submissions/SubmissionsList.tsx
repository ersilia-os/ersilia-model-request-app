import Link from "next/link";

type SubmissionsData = {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  publication: string;
  sourceCode: string;
  license: string;
  submittedDate: string;
  status: string;
};

interface SubmissionsDataProps {
  data: Promise<SubmissionsData[]>;
}

export default async function SubmissionsList({ data }: SubmissionsDataProps) {
  const submissions = await data;
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
          </div>
        </Link>
      ))}
    </div>
  );
}
