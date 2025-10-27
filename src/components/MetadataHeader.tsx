import { ErsiliaIssue, ModelMetadata } from "../../generated/prisma";

type MetadataTitle = ModelMetadata["title"];
type MetadataStatus = ModelMetadata["status"];
type MetadataUpdated = ModelMetadata["updatedAt"];
type MetadataGitHubLink = ErsiliaIssue["issueUrl"];

interface MetadataHeaderProps {
  title: MetadataTitle;
  status: MetadataStatus;
  updatedAt: MetadataUpdated;
  gihublink?: MetadataGitHubLink;
}

export default function MetadataHeader({
  title,
  updatedAt,
  status,
  gihublink,
}: MetadataHeaderProps) {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-plum md:text-3xl lg:text-4xl text-pretty">
        {title}
      </h1>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "DRAFT"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </span>
        {status === "DRAFT" ? (
          <span className="text-sm text-gray-500">
            Last update: {new Date(updatedAt).toLocaleDateString()}
          </span>
        ) : (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 underline"
            href={gihublink}
          >
            Click to view status
          </a>
        )}
      </div>
    </>
  );
}
