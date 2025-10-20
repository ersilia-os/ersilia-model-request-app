import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSubmissionBySlug } from "./actions";
import { Separator } from "@radix-ui/react-separator";
import { FileText } from "lucide-react";

type Params = { slug: string };

export default async function SubmissionDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  const submission = await getSubmissionBySlug(slug);

  if (!submission) return;

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="mb-2 text-2xl font-bold text-plum md:text-3xl lg:text-4xl">
            {submission.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                submission.status === "DRAFT"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {submission.status}
            </span>
            <span className="text-sm text-gray-500">
              Last update: {new Date(submission.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          {submission.description && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Description
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {submission.description}
              </p>
            </div>
          )}
          <Separator />
          {submission.interpretation && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Interpretation
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {submission.interpretation}
              </p>
            </div>
          )}
          <Separator />
          {submission.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {submission.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submission.task && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">Task</h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {submission.task}
                </span>
              </div>
            )}

            {submission.subtask && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Subtask
                </h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {submission.subtask}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submission.input && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">Input</h2>
                <p className="text-gray-700 text-base mt-2">
                  Type:
                  <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {submission.input}
                  </span>
                </p>

                {submission.inputDimension && (
                  <p className="text-gray-700 text-base mt-2">
                    Dimension:
                    <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {submission.inputDimension}
                    </span>
                  </p>
                )}
              </div>
            )}

            {submission.output.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">Output</h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <p className="text-gray-700 text-base">Type:</p>
                  {submission.output.map((out) => (
                    <span
                      key={out}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {out}
                    </span>
                  ))}
                </div>
                {submission.outputDimension && (
                  <p className="text-gray-700 text-base mt-2">
                    Dimension:
                    <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {submission.outputDimension}
                    </span>
                  </p>
                )}
                {submission.outputConsistency && (
                  <p className="text-gray-700 text-base mt-2">
                    Consistency:
                    <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {submission.outputConsistency}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
          <Separator />
          {submission.biomedicalArea.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Biomedical Area
              </h2>
              <div className="flex flex-wrap gap-2">
                {submission.biomedicalArea.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
          <Separator />
          {submission.targetOrganism.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Target Organism
              </h2>
              <div className="flex flex-wrap gap-2">
                {submission.targetOrganism.map((organism) => (
                  <span
                    key={organism}
                    className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
                  >
                    {organism}
                  </span>
                ))}
              </div>
            </div>
          )}
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {submission.deployment && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Deployment
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {submission.deployment}
                </p>
              </div>
            )}
            {submission.license && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  License
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {submission.license}
                </p>
              </div>
            )}

            {submission.publicationYear && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Publication Year
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {submission.publicationYear}
                </p>
              </div>
            )}
          </div>
          <Separator />
          {(submission.publicationUrl || submission.sourceUrl) && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-plum mb-2">
                Resources
              </h2>
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                {submission.publicationUrl && (
                  <a
                    href={submission.publicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FileText className="w-5 h-5 text-plum flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-plum">
                        Publication
                        {submission.publicationType && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({submission.publicationType})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {submission.publicationUrl}
                      </p>
                    </div>
                  </a>
                )}

                {submission.sourceUrl && (
                  <a
                    href={submission.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-plum">
                        Source Code
                        {submission.sourceType && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({submission.sourceType})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {submission.sourceUrl}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
          <Separator />
          <div className="flex items-center gap-3 pt-4"></div>
        </CardContent>
      </Card>
    </div>
  );
}
