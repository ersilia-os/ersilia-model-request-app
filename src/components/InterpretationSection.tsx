import { ModelMetadata } from "../../generated/prisma";

type MetadataIntepreation = ModelMetadata["description"];

interface InterpretationSectionProps {
  interpretation: MetadataIntepreation;
}

export function InterpretationSection({
  interpretation,
}: InterpretationSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-plum mb-2">Interpretation</h2>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed text-pretty text-justify">
        {interpretation}
      </p>
    </div>
  );
}
