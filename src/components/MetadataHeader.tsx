import Link from "next/link";
import { ErsiliaIssue, ModelMetadata } from "../../generated/prisma";
import { Button } from "./ui/button";

type MetadataTitle = ModelMetadata["title"];
type MetadataStatus = ModelMetadata["status"];
type MetadataUpdated = ModelMetadata["updatedAt"];
type MetadataGitHubLink = ErsiliaIssue["issueUrl"];
type MetadataSlug = ModelMetadata["slug"];

interface MetadataHeaderProps {
  title: MetadataTitle;
  status: MetadataStatus;
  updatedAt: MetadataUpdated;
  gihublink?: MetadataGitHubLink;
  slug: MetadataSlug;
}

export default function MetadataHeader({
  title,
  updatedAt,
  status,
  gihublink,
  slug,
}: MetadataHeaderProps) {
  return (
    <div>
      <div className="flex justify-between w-full">
        <h2 className="mb-4 text-2xl font-semibold text-plum text-pretty">
          {title}
        </h2>
        {status === "DRAFT" && (
          <Link href={`/new-model/metadata/${slug}`} className="">
            <Button
              type="button"
              variant="edit"
              className="w-full text-xs sm:text-base"
            >
              Edit Metadata
            </Button>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-start gap-2">
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
    </div>
  );
}
