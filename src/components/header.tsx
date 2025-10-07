import Image from "next/image";
import Link from "next/link";

import { auth0 } from "@/lib/auth0";

export default async function Header() {
  const session = await auth0.getSession();

  if (!session) {
    return null;
  }

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/">
        <Image
          src="/images/ersilia_logo.png"
          alt="Ersilia logo"
          width={48}
          height={48}
          priority
        />
      </Link>
      <Link
        href="/auth/logout"
        className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        Log out
      </Link>
    </header>
  );
}
