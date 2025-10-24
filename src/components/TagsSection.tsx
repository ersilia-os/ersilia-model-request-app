import { ModelMetadata } from "../../generated/prisma";

type MetadataTags = ModelMetadata["tags"];

interface TagsSectionProps {
  tags: MetadataTags;
}

export function TagsSection({ tags }: TagsSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-plum mb-2">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-plum/10 text-plum rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
