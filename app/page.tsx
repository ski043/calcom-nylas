import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./lib/session";
import { redirect } from "next/navigation";
import { Navbar } from "./components/landingPage/Navbar";

export default async function Home() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.grantId) {
    return redirect("/dashboard ");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
    </div>
  );
}
