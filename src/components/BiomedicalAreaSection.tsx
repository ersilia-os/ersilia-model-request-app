import { ModelMetadata } from "../../generated/prisma";

type MetadataBioMedArea = ModelMetadata["biomedicalArea"];

interface BiomedicalAreaSectionProps {
  biomedicalArea: MetadataBioMedArea;
}

export function BiomedicalAreaSection({
  biomedicalArea,
}: BiomedicalAreaSectionProps) {
  return (
    <div>
      <h2 className="text-plum mb-2 text-lg font-semibold">Biomedical Area</h2>
      <div className="flex flex-wrap gap-2">
        {biomedicalArea.map((area) => (
          <span
            key={area}
            className="bg-plum/10 text-plum rounded-full px-3 py-1 text-sm font-medium">
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
