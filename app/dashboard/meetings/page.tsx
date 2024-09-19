import { cancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButton";
import { auth } from "@/app/lib/auth";
import { nylas } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";

import React from "react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  return data;
}

const MeetingsPage = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p>Wed. 18 Sep</p>
                    <p>09:00 AM - 10:00 AM</p>
                  </div>
                  <p className="text-center">1 Host</p>

                  <SubmitButton
                    text="Cancel Meeting"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MeetingsPage;
