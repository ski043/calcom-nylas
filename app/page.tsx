import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { SessionData, sessionOptions } from "./lib/session";

export default async function Home() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.grantId) {
    return (
      <div>
        no session <Link href="/api/auth">go to cal</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>hello to calmarshal</h1>
      <Link href="/api/auth/logout">logout</Link>
    </div>
  );
}
