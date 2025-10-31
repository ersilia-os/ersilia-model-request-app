import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "./actions";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  await getOrCreateUser(session);

  return <>{/* <WelcomeScreen /> */}</>;
}
