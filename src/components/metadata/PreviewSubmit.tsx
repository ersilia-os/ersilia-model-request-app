"use client";

import z from "zod";

import { Card, CardContent, CardHeader } from "../ui/card";
import { MetadataFormSchema } from "@/lib/schemas";
import { Separator } from "../ui/separator";

type MetadataPreview = z.infer<typeof MetadataFormSchema>;

type PreviewSubmitProps = {
  data?: MetadataPreview | null;
};

const previewData: MetadataPreview = {
  title: "Proposed Model Title",
  slug: "proposed-model-title",
  status: "Draft",
  description:
    "Short summary of the model purpose, training data, and expected behaviour. Replace this text with the real form values once the flow is wired.",
  interpretation:
    "Explain how to interpret the model predictions, what each value represents, and any known limitations.",
  tags: ["Cheminformatics", "Drug Discovery", "AI"],
  task: "Classification",
  subtask: "Binary Classification",
  input: "Molecules",
  input_dimension: "2048",
  output: ["Probability", "Class"],
  output_dimension: "2",
  output_consistency: "Deterministic",
  publication_url: "https://example.com/publication",
  publication_type: "Journal article",
  publication_year: "2023",
  source_url: "https://github.com/example/repo",
  source_type: "GitHub",
  deployment: "Docker",
  license: "MIT License",
  biomedical_area: ["Infectious Diseases"],
  target_organism: ["Mycobacterium tuberculosis"],
};

const statusStyles: Record<string, string> = {
  draft: "bg-yellow-300 text-black",
  submitted: "bg-green-300 text-black",
};

export default function PreviewSubmit({ data }: PreviewSubmitProps) {
  const finalData = data ?? previewData;
  const statusKey = finalData.status?.toLowerCase() ?? "";
  const statusVariant = statusStyles[statusKey] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-6xl rounded-2xl border-2 border-plum p-6 shadow-xl md:p-8 lg:p-10">
        <CardHeader className="mb-6 p-0 text-center">
          <h1 className="mb-2 text-2xl font-bold text-plum md:text-3xl lg:text-4xl">
            {finalData.title}
          </h1>
          <span
            className={`mx-auto mt-2 inline-flex w-fit items-center rounded-full px-3.5 py-1 text-sm font-semibold ${statusVariant}`}
          >
            {finalData.status}
          </span>
        </CardHeader>

        <CardContent className="space-y-10 p-0">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-plum">
              Basic identification
            </h2>
            <div className="grid gap-4 text-sm text-plum/90 md:grid-cols-2">
              <div>
                <p className="text-base text-plum/90">Title</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.title ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Slug</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.slug ?? "—"}
                </p>
              </div>
            </div>
          </section>
          <Separator />
          <section>
            <h2 className="mb-2 text-lg font-semibold text-plum">
              Description & interpretation
            </h2>
            <p className="leading-relaxed text-gray-700">
              {finalData.description}
            </p>
            <h3 className="mt-4 text-sm font-semibold uppercase text-plum">
              Interpretation
            </h3>
            <p className="leading-relaxed text-gray-700">
              {finalData.interpretation}
            </p>
          </section>
          <Separator />
          <section>
            <h2 className="mb-2 text-lg font-semibold text-plum">
              Classification & tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {finalData.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-plum/10 px-3 py-1 text-sm font-medium text-plum/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
          <Separator />
          <section>
            <h2 className="mb-3 text-lg font-semibold text-plum">
              Technical specifications
            </h2>
            <div className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
              <div>
                <p className="text-base text-plum/90">Task</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.task ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Subtask</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.subtask ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Input</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.input ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Input dimension</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.input_dimension ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Outputs</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.output.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Output dimension</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.output_dimension ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Output consistency</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.output_consistency ?? "—"}
                </p>
              </div>
            </div>
          </section>
          <Separator />
          <section>
            <h2 className="mb-3 text-lg font-semibold text-plum">
              Source & licensing
            </h2>
            <div className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
              <div>
                <p className="text-base text-plum/90">License</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.license ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Deployment</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.deployment ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Publication URL</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.publication_url ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Publication type</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.publication_type ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Publication year</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.publication_year ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Source URL</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.source_url ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Source type</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.source_type ?? "—"}
                </p>
              </div>
            </div>
          </section>
          <Separator />
          <section>
            <h2 className="mb-3 text-lg font-semibold text-plum">
              Research context
            </h2>
            <div className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
              <div>
                <p className="text-base text-plum/90">Biomedical area</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.biomedical_area.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-base text-plum/90">Target organism</p>
                <p className="mt-1 text-base text-gray-700">
                  {finalData.target_organism.join(", ")}
                </p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
