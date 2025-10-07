import Image from "next/image";
import Link from "next/link";

import { auth0 } from "@/lib/auth0";

export default async function Header() {
  const session = await auth0.getSession();

  if (!session) {
    return null;
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white text-plum border-b-4 border-plum shadow-sm">
      <Link href="/">
        <Image
          src="/images/ersilia_logo.png"
          alt="Ersilia logo"
          width={120}
          height={120}
          priority
        />
      </Link>
      <Link
        href="/auth/logout"
        className="bg-plum text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition duration-200 hover:bg-plum/90 hover:shadow-md"
      >
        Log out
      </Link>
    </header>
  );
}
