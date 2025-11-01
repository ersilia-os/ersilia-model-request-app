import { ModelMetadata } from "../../generated/prisma";

type MetadataInput = ModelMetadata["input"];
type MetadataInputDimension = ModelMetadata["inputDimension"];
type MetadataOutput = ModelMetadata["output"];
type MetadataOutputDimension = ModelMetadata["outputDimension"];
type MetadataOutputConsistency = ModelMetadata["outputConsistency"];

interface InputOutputSectionProps {
  input: MetadataInput;
  inputDimension: MetadataInputDimension;
  output: MetadataOutput;
  outputDimension: MetadataOutputDimension;
  outputConsistency: MetadataOutputConsistency;
}

export function InputOutputSection({
  input,
  inputDimension,
  output,
  outputDimension,
  outputConsistency,
}: InputOutputSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <h2 className="text-plum mb-2 text-lg font-semibold">Input</h2>
        <p className="mt-2 text-base text-gray-700">
          Type:
          <span className="ml-1 rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
            {input}
          </span>
        </p>

        <p className="mt-2 text-base text-gray-700">
          Dimension:
          <span className="ml-1 rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
            {inputDimension}
          </span>
        </p>
      </div>

      <div>
        <h2 className="text-plum mb-2 text-lg font-semibold">Output</h2>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-base text-gray-700">Type:</p>
          {output.map((out) => (
            <span
              key={out}
              className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
              {out}
            </span>
          ))}
        </div>
        {outputDimension && (
          <p className="mt-2 text-base text-gray-700">
            Dimension:
            <span className="ml-1 rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
              {outputDimension}
            </span>
          </p>
        )}

        <p className="mt-2 text-base text-gray-700">
          Consistency:
          <span className="ml-1 rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
            {outputConsistency}
          </span>
        </p>
      </div>
    </div>
  );
}
