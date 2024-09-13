import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { SessionData, sessionOptions } from "./lib/session";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.png";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.grantId) {
    return redirect("/dashboard ");
  }

  return (
    <nav className="flex items-center w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 justify-between">
      <Link href="/" className="flex items-center gap-x-2">
        <Image src={Logo} alt="logo" width={50} height={50} />
        <h1 className="text-3xl font-bold">
          Cal<span className="text-primary">Marshal</span>
        </h1>
      </Link>

      <Button asChild>
        <Link href="/api/auth">Get Started Today</Link>
      </Button>
    </nav>
  );
}
