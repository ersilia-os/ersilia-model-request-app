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
      <h2 className="text-plum mb-2 text-lg font-semibold">Interpretation</h2>
      <p className="text-justify text-sm leading-relaxed text-pretty text-gray-600 md:text-base">
        {interpretation}
      </p>
    </div>
  );
}
