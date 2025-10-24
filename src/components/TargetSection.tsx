import { ModelMetadata } from "../../generated/prisma";

type MetadataTarget = ModelMetadata["targetOrganism"];

interface TargetOrganismSectionProps {
  targetOrganism: MetadataTarget;
}

export function TargetOrganismSection({
  targetOrganism,
}: TargetOrganismSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-plum mb-2">Target Organism</h2>
      <div className="flex flex-wrap gap-2">
        {targetOrganism.map((organism) => (
          <span
            key={organism}
            className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
          >
            {organism}
          </span>
        ))}
      </div>
    </div>
  );
}
