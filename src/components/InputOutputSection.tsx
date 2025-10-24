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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold text-plum mb-2">Input</h2>
        <p className="text-gray-700 text-base mt-2">
          Type:
          <span className="ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {input}
          </span>
        </p>

        <p className="text-gray-700 text-base mt-2">
          Dimension:
          <span className="ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {inputDimension}
          </span>
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-plum mb-2">Output</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-gray-700 text-base">Type:</p>
          {output.map((out) => (
            <span
              key={out}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
            >
              {out}
            </span>
          ))}
        </div>
        {outputDimension && (
          <p className="text-gray-700 text-base mt-2">
            Dimension:
            <span className="ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
              {outputDimension}
            </span>
          </p>
        )}

        <p className="text-gray-700 text-base mt-2">
          Consistency:
          <span className="ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {outputConsistency}
          </span>
        </p>
      </div>
    </div>
  );
}
