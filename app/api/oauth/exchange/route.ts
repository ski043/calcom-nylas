import prisma from "@/app/lib/db";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { getIronSession } from "iron-session";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Received callback from Nylas");
  const url = new URL(req.url as string);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {
      status: 400,
    });
  }
  const codeExchangePayload = {
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
    code,
  };

  try {
    const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
    const { grantId, email } = response;

    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    session.email = email;
    session.grantId = grantId;

    await session.save();

    await prisma.user.upsert({
      where: { email: session.email }, // Checks if a user with this email exists
      update: { grantId: session.grantId }, // Updates if user exists
      create: {
        email: session.email,
        grantId: session.grantId,
      }, // Creates a new user if it doesn't exist
    });

    console.log({ grantId });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
  }

  redirect("/");
}
