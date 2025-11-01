import { ModelMetadata } from "../../generated/prisma";

type MetadataDescription = ModelMetadata["description"];
interface DescriptionSectionProps {
  description: MetadataDescription;
}

export function DescriptionSection({ description }: DescriptionSectionProps) {
  return (
    <div>
      <h2 className="text-plum mb-2 text-lg font-semibold">Description</h2>
      <p className="text-justify text-sm leading-relaxed text-pretty text-gray-600 md:text-base">
        {description}
      </p>
    </div>
  );
}
