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

type Metadata = {
  id: MetadataId;
  title: MetadataTitle;
  slug: MetadataSlug;
  status: MetadataUrlStatus;
  updatedAt: MetadataUpdate;
};

export const columns: ColumnDef<Metadata>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate">{row.getValue("title")}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          className={`${
            status === "DRAFT"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last update",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = formatDistanceToNow(date, { addSuffix: true });

      return <div>{formatted}</div>;
    },
  },
];
