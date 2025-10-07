import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import PublicationForm from "./publication-upload";

export default async function Home() {
  const session = await auth0.getSession();

  console.log("🟥", session);
  if (!session) {
    redirect("/auth/login");
  }

  const userName = session.user.name || session.user.nickname || "User";

  return (
    <>
      <PublicationForm userName={userName} />
    </>
  );
}
