import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();
  console.log("🟥", session);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <div className="bg-amber-700 w-full">
        Ersilia - Welcome {session.user.name} go to /auth/logout to logout
      </div>
    </>
  );
}
