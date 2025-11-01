import { ModelMetadata } from "../../generated/prisma";

type MetadataTags = ModelMetadata["tags"];

interface TagsSectionProps {
  tags: MetadataTags;
}

export function TagsSection({ tags }: TagsSectionProps) {
  return (
    <div>
      <h2 className="text-plum mb-2 text-lg font-semibold">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-plum/10 text-plum rounded-full px-3 py-1 text-sm font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
