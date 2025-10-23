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
  if (!data.length) {
    return (
      <div className="text-center text-plum text-sm md:text-base lg:text-lg mb-2">
        <p className="text-center">There is no users with submissions.</p>
      </div>
    );
  }
  return (
    <div className="mb-6 flex flex-col gap-3">
      {data.map((user) => (
        <div
          key={user.sub}
          className="border-2 border-plum/20 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex-1 flex justify-between">
              <div className="flex w-full space-x-2">
                <User className="text-plum/80" />
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="flex w-full space-x-2">
                <Mail className="text-plum/80" />
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-plum text-white">
                <span>{user.metadataRecords.length}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
