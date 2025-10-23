import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "./actions";
import WelcomeScreen from "@/components/WelcomeScreen";

export default async function Home() {
  const session = await auth0.getSession();

  console.log("Home page session:", session);
  if (!session) {
    redirect("/auth/login");
  }

  await getOrCreateUser(
    session.user.sub,
    session.user.email,
    session.user.name
  );

  return (
    <>
      <WelcomeScreen />
    </>
  );
}
