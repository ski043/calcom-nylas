import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
  /* const session = await getIronSession<SessionData>(cookies(), sessionOptions); */
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  return session;
}
