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
      <h2 className="text-plum mb-2 text-lg font-semibold">Target Organism</h2>
      <div className="flex flex-wrap gap-2">
        {targetOrganism.map((organism) => (
          <span
            key={organism}
            className="bg-plum/10 text-plum rounded-full px-3 py-1 text-sm font-medium">
            {organism}
          </span>
        ))}
      </div>
    </div>
  );
}
