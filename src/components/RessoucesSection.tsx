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
      <h2 className="text-lg font-semibold text-plum mb-2">Resources</h2>
      <div className="flex flex-col space-y-3 [@media(min-width:950px)]:flex-row [@media(min-width:950px)]:space-y-0 [@media(min-width:950px)]:space-x-3">
        {publicationUrl && (
          <a
            href={publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FileText className="w-5 h-5 text-plum shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-plum">
                Publication
                {publicationType && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({publicationType})
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 truncate">{publicationUrl}</p>
            </div>
          </a>
        )}

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 p-3 border-2 border-plum/20 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Github className="w-5 h-5 text-plum shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-plum">
                Source Code
                {sourceType && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({sourceType})
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 truncate">{sourceUrl}</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
