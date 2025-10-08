import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "./actions";
import WelcomeScreen from "@/components/WelcomeScreen";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await getOrCreateUser(session.internal.sid, {
    name: session.user.name || "User",
  });

  return (
    <>
      {/* <PublicationForm userName={user.name} /> */}
      <WelcomeScreen userName={user.name} />
    </>
  );
}