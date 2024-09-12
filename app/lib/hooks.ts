import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.grantId) {
    return redirect("/api/auth");
  }

  return session;
}
