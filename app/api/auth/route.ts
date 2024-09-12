import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
  });
  return redirect(authUrl);
}
