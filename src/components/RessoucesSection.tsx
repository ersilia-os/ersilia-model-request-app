import { FileText, Github } from "lucide-react";

import { ModelMetadata } from "../../generated/prisma";

type MetadataPubUrl = ModelMetadata["publicationUrl"];
type MetadataPubType = ModelMetadata["publicationType"];
type MetadataSourceUrl = ModelMetadata["sourceUrl"];
type MetadataSourceType = ModelMetadata["sourceType"];

interface ResourcesSectionProps {
  publicationUrl: MetadataPubUrl;
  publicationType: MetadataPubType;
  sourceUrl: MetadataSourceUrl;
  sourceType: MetadataSourceType;
}

export function ResourcesSection({
  publicationUrl,
  publicationType,
  sourceUrl,
  sourceType,
}: ResourcesSectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-plum mb-2 text-lg font-semibold">Resources</h2>
      <div className="flex flex-col space-y-3 [@media(min-width:950px)]:flex-row [@media(min-width:950px)]:space-y-0 [@media(min-width:950px)]:space-x-3">
        {publicationUrl && (
          <a
            href={publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-plum/20 flex w-full items-center gap-2 rounded-lg border-2 p-3 transition-colors duration-200 hover:bg-gray-50">
            <FileText className="text-plum h-5 w-5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-plum text-sm font-medium">
                Publication
                {publicationType && (
                  <span className="ml-1 text-xs text-gray-500">
                    ({publicationType})
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-gray-500">{publicationUrl}</p>
            </div>
          </a>
        )}

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-plum/20 flex w-full items-center gap-2 rounded-lg border-2 p-3 transition-colors duration-200 hover:bg-gray-50">
            <Github className="text-plum h-5 w-5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-plum text-sm font-medium">
                Source Code
                {sourceType && (
                  <span className="ml-1 text-xs text-gray-500">
                    ({sourceType})
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-gray-500">{sourceUrl}</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
