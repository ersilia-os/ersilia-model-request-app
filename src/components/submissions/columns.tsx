"use client";

import { formatDistanceToNow } from "date-fns";
import { ModelMetadata } from "../../../generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

type MetadataId = ModelMetadata["id"];
type MetadataTitle = ModelMetadata["title"];
type MetadataSlug = ModelMetadata["slug"];
type MetadataUrlStatus = ModelMetadata["status"];
type MetadataUpdate = ModelMetadata["updatedAt"];
type MetadataCreate = ModelMetadata["createdAt"];
type MetadataTags = ModelMetadata["tags"];

type Metadata = {
  id: MetadataId;
  title: MetadataTitle;
  slug: MetadataSlug;
  status: MetadataUrlStatus;
  updatedAt: MetadataUpdate;
  createdAt: MetadataCreate;
  tags: MetadataTags;
};

export const columns: ColumnDef<Metadata>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      const visibleTags = tags.slice(0, 3);
      const remainingCount = tags.length - 3;

      return (
        <div className="flex flex-wrap gap-1">
          {visibleTags.map((tag) => (
            <Badge className="bg-plum/10 text-plum whitespace-nowrap" key={tag}>
              {tag}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge className="bg-plum/10 text-plum">
              +{remainingCount} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div>
          <Badge
            className={`${
              status === "DRAFT"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = formatDistanceToNow(date, { addSuffix: true });

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = formatDistanceToNow(date, { addSuffix: true });

      return <div>{formatted}</div>;
    },
  },
];
