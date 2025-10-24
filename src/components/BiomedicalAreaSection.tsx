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
      <h2 className="text-lg font-semibold text-plum mb-2">Biomedical Area</h2>
      <div className="flex flex-wrap gap-2">
        {biomedicalArea.map((area) => (
          <span
            key={area}
            className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
