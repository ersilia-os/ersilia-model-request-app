"use client";

import Link from "next/link";
import { useState } from "react";

import { Mail, User } from "lucide-react";

import { Prisma } from "../../../generated/prisma";

type UsersWithSubmissions = Prisma.UserGetPayload<{
  include: {
    metadataRecords: true;
  };
}>;

interface UserListProps {
  data: UsersWithSubmissions[];
}

export default function UserList({ data }: UserListProps) {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  if (!data.length) {
    return (
      <div className="text-plum mb-2 text-center text-sm md:text-base lg:text-lg">
        <p className="text-center">There is no users with submissions.</p>
      </div>
    );
  }

  const handleToggle = (userSub: string) => {
    if (expandedUser === userSub) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userSub);
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-3">
      {data.map((user) => (
        <div
          key={user.sub}
          onClick={() => handleToggle(user.sub)}
          className="border-plum/20 rounded-lg border-2 p-4 transition-colors duration-200 hover:bg-gray-50">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 justify-between">
              <div className="flex w-full space-x-2">
                <User className="text-plum/80" />
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="flex w-full space-x-2">
                <Mail className="text-plum/80" />
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="bg-plum rounded-full px-3 py-1 text-xs font-medium text-white">
                <span>{user.metadataRecords.length}</span>
              </div>
            </div>
          </div>

          {expandedUser === user.sub && (
            <div className="mt-4 flex flex-col gap-3">
              {user.metadataRecords.map((submission) => (
                <Link
                  key={submission.slug}
                  href={`/admin/${submission.slug}`}
                  className="border-plum/20 rounded-lg border-2 p-4 transition-colors duration-200 hover:bg-gray-100">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-plum text-base font-semibold md:text-lg">
                        {submission.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Submitted:{" "}
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          submission.status === "SUBMITTED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
