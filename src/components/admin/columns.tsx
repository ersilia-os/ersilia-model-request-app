"use client";
import { ModelMetadata, User, ErsiliaIssue } from "../../../generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import Link from "next/link";

type MetadataSub = User["sub"];
type MetadataEmail = User["email"];
type MetadataUrlStatus = ModelMetadata["status"];
type MetadataFileName = ModelMetadata["fileName"];
type IssueNumber = ErsiliaIssue["issueNumber"];
type IssueUrl = ErsiliaIssue["issueUrl"];

type Metadata = {
  sub: MetadataSub;
  email: MetadataEmail;
  status: MetadataUrlStatus;
  fileName: MetadataFileName;
  issueNumber: IssueNumber | null;
  issueUrl: IssueUrl | null;
};

export const columns: ColumnDef<Metadata>[] = [
  {
    accessorKey: "issueNumber",
    header: "Issue #",
    cell: ({ row }) => {
      const issueNumber = row.getValue("issueNumber") as number | null;
      return <div>{issueNumber ?? "-"}</div>;
    },
    filterFn: (row, id, value) => {
      const issueNumber = row.getValue(id) as number | null;
      if (!issueNumber) return false;
      return issueNumber.toString().includes(value);
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string | null;
      return (
        <div className="max-w-[250px] truncate" title={email ?? undefined}>
          {email ?? "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => {
      const fileName = row.getValue("fileName") as string | null;
      return (
        <div className="max-w-[300px] truncate" title={fileName ?? undefined}>
          {fileName ?? "-"}
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
    accessorKey: "issueUrl",
    header: "Issue URL",
    cell: ({ row }) => {
      const url = row.getValue("issueUrl") as string | null;

      if (!url) {
        return <div className="text-gray-400">-</div>;
      }

      return (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline max-w-[200px] truncate block"
          title={url}
        >
          View Issue
        </Link>
      );
    },
  },
];
