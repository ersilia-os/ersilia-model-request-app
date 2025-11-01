"use client";

import { ColumnDef } from "@tanstack/react-table";

import { User } from "../../../../generated/prisma";

type MetadataSub = User["sub"];
type MetadataEmail = User["email"];
type MetadataGithub = User["githubAccount"];

type Metadata = {
  sub: MetadataSub;
  email: MetadataEmail;
  count: number;
  githubAccount: MetadataGithub;
  draftCount: number;
  submittedCount: number;
};

export const columns: ColumnDef<Metadata>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div title={email ?? undefined}>{email ?? "-"}</div>;
    },
  },
  {
    accessorKey: "draftCount",
    header: () => <div className="text-center">Drafts</div>,
    cell: ({ row }) => {
      const draftCount = row.getValue("draftCount") as number;
      return <div className="text-center">{draftCount}</div>;
    },
  },
  {
    accessorKey: "submittedCount",
    header: () => <div className="text-center">Submitted</div>,
    cell: ({ row }) => {
      const submittedCount = row.getValue("submittedCount") as number;
      return <div className="text-center">{submittedCount}</div>;
    },
  },
  {
    accessorKey: "count",
    header: () => <div className="text-center">Total Submissions</div>,
    cell: ({ row }) => {
      const count = row.getValue("count") as number;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    accessorKey: "githubAccount",
    header: "Github",
    cell: ({ row }) => {
      const githubAccount = row.getValue("githubAccount") as string;
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${githubAccount}`}>
          <div title={githubAccount ?? undefined}>
            @{githubAccount ?? "none"}
          </div>
        </a>
      );
    },
  },
];
