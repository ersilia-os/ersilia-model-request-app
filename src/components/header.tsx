import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export default async function Header() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  const auth0Roles = (session.user.ersilia as string[]) || [];
  const isAdmin = auth0Roles.includes("admin");

  return (
    <header className="flex items-center justify-between px-10 sm:px-15 md:px-25 lg:px-35 py-4 bg-[#f5f4f6] text-plum shadow-sm">
      <Link href="/">
        <Image
          src="/images/ersilia_logo.png"
          alt="Ersilia logo"
          width={120}
          height={120}
          priority
          unoptimized
        />
      </Link>
      <div className="flex items-center space-x-4 gap-4">
        {isAdmin && (
          <Link
            href="/admin"
            className="bg-white text-plum text-sm font-medium px-4 py-2 rounded-lg shadow-sm border-plum border-2 transition duration-200 hover:bg-gray-200 hover:shadow-md"
          >
            Admin Dashboard
          </Link>
        )}
        <a
          href="/auth/logout"
          className="bg-plum text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition duration-200 hover:bg-plum/90 hover:shadow-md"
        >
          Log out
        </a>
      </div>
    </header>
  );
}
