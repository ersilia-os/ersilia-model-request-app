import { ModelMetadata } from "../../generated/prisma";

type MetadataDescription = ModelMetadata["description"];
interface DescriptionSectionProps {
  description: MetadataDescription;
}

export function DescriptionSection({ description }: DescriptionSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-plum mb-2">Description</h2>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed text-pretty text-justify">
        {description}
      </p>
    </div>
  );
}
