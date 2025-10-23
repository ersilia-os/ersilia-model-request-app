"use client";
import { FileText, Github, Loader2 } from "lucide-react";
import { ModelMetadata } from "../../../generated/prisma";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSubmitToErsilia } from "@/hooks/useSubmitToErsilia";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PreviewSubmitProps {
  data: ModelMetadata;
}

export default function PreviewSubmit({ data }: PreviewSubmitProps) {
  const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  const router = useRouter();
  const [confirmStep, setConfirmStep] = useState(false);
  const { submitMetadata, loading } = useSubmitToErsilia({
    owner,
    repo,
  });

  async function handleSend() {
    if (!confirmStep) {
      setConfirmStep(true);

      setTimeout(() => setConfirmStep(false), 3000);
      return;
    }

    const result = await submitMetadata(data.id, data.isContributor);

    if (result.success) {
      setConfirmStep(false);
      setTimeout(() => {
        router.push(`/thank-you/${data.slug}`);
      }, 1500);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="mb-2 text-2xl font-bold text-plum md:text-3xl lg:text-4xl">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                data.status === "DRAFT"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {data.status}
            </span>
            <span className="text-sm text-gray-500">
              Last update: {new Date(data.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <Separator />
          {data.description && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Description
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {data.description}
              </p>
            </div>
          )}
          <Separator />
          {data.interpretation && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Interpretation
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {data.interpretation}
              </p>
            </div>
          )}
          <Separator />
          {data.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag) => (
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
            {data.task && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">Task</h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {data.task}
                </span>
              </div>
            )}

            {data.subtask && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Subtask
                </h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {data.subtask}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.input && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">Input</h2>
                <p className="text-gray-700 text-base mt-2">
                  Type:
                  <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {data.input}
                  </span>
                </p>

                {data.inputDimension && (
                  <p className="text-gray-700 text-base mt-2">
                    Dimension:
                    <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {data.inputDimension}
                    </span>
                  </p>
                )}
              </div>
            )}

            {data.output.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">Output</h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <p className="text-gray-700 text-base">Type:</p>
                  {data.output.map((out) => (
                    <span
                      key={out}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {out}
                    </span>
                  ))}
                </div>
                {data.outputDimension && (
                  <p className="text-gray-700 text-base mt-2">
                    Dimension:
                    <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {data.outputDimension}
                    </span>
                  </p>
                )}
                {data.outputConsistency && (
                  <p className="text-gray-700 text-base mt-2">
                    Consistency:
                    <span className=" ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {data.outputConsistency}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
          <Separator />
          {data.biomedicalArea.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Biomedical Area
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.biomedicalArea.map((area) => (
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
          {data.targetOrganism.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Target Organism
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.targetOrganism.map((organism) => (
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
            {data.deployment && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Deployment
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {data.deployment}
                </p>
              </div>
            )}
            {data.license && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  License
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {data.license}
                </p>
              </div>
            )}

            {data.publicationYear && (
              <div>
                <h2 className="text-lg font-semibold text-plum mb-2">
                  Publication Year
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {data.publicationYear}
                </p>
              </div>
            )}
          </div>
          <Separator />
          {(data.publicationUrl || data.sourceUrl) && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-plum mb-2">
                Resources
              </h2>
              <div className="flex flex-col space-y-3 [@media(min-width:950px)]:flex-row [@media(min-width:950px)]:space-y-0 [@media(min-width:950px)]:space-x-3">
                {data.publicationUrl && (
                  <a
                    href={data.publicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FileText className="w-5 h-5 text-plum shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-plum">
                        Publication
                        {data.publicationType && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({data.publicationType})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {data.publicationUrl}
                      </p>
                    </div>
                  </a>
                )}

                {data.sourceUrl && (
                  <a
                    href={data.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Github className="w-5 h-5 text-plum shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-plum">
                        Source Code
                        {data.sourceType && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({data.sourceType})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {data.sourceUrl}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
          <Separator />
          {data.isContributor && (
            <div>
              <h2 className="text-lg font-semibold text-plum mb-2">
                Contribution
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                You will be listed as a contributor with your Github Account
              </p>
            </div>
          )}
          <Separator />
          <div className="flex items-center gap-3 pt-4">
            <Button
              variant={"plum"}
              className="text-base"
              onClick={handleSend}
              disabled={loading || data.status === "SUBMITTED"}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : confirmStep ? (
                "Click again to confirm"
              ) : (
                "Send to Ersilia"
              )}
            </Button>
            <Link href={`/new-model/metadata/${data.slug}`}>
              <Button
                type="button"
                variant="transparent"
                className="text-base"
                disabled={loading || data.status === "SUBMITTED"}
              >
                Edit Metadata
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
