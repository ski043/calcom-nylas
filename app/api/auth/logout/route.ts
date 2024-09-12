import { SessionData, sessionOptions } from "@/app/lib/session";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // Destroy the session
  session.destroy();

  revalidatePath("/");

  return NextResponse.redirect(new URL("/", req.url));
}
