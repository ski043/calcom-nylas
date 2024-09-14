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

    await prisma.user.upsert({
      where: { email }, // Checks if a user with this email exists
      update: { grantId }, // Updates if user exists
      create: {
        email: email,
        grantId: grantId,
        profileImage: `https://avatar.vercel.sh/${email}`,
      }, // Creates a new user if it doesn't exist
    });

    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    session.email = email;
    session.grantId = grantId;
    session.profileImage = `https://avatar.vercel.sh/${email}`;

    await session.save();

    console.log({ grantId });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
  }

  redirect("/dashboard");
}
