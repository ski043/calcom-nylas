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
import { format, fromUnixTime } from "date-fns";
import { Icon, Video } from "lucide-react";

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
                    <p>
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p>
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center">
                      <Video className="size-4 mr-2 text-primary" />{" "}
                      <a target="_blank" href={item.conferencing.details.url}>
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2>{item.title}</h2>
                    <p>You and {item.participants[0].name}</p>
                  </div>
                  <SubmitButton
                    text="Cancel Event"
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

/* 

{
  "requestId": "1727705504-e08b07e4-4ee8-45f4-b1d2-378349803957",
  "data": [
    {
      "busy": true,
      "calendarId": "jan@alenix.de",
      "conferencing": {
        "provider": "Google Meet",
        "details": {
          "meetingCode": "jba-eyyd-ehc",
          "url": "https://meet.google.com/jba-eyyd-ehc",
          "pin": "319265431",
          "phone": [
            "tel:+49-40-8081617128"
          ]
        }
      },
      "description": "hey how are you. meet me in this meeting hahaha",
      "hideParticipants": false,
      "icalUid": "g58hpq1hl5s8uear6ib5i3dsk8@google.com",
      "organizer": {
        "name": "",
        "email": "jan@alenix.de"
      },
      "participants": [
        {
          "email": "hecale4803@heweek.com",
          "name": "Jan Marshal",
          "status": "yes"
        }
      ],
      "resources": [],
      "readOnly": false,
      "reminders": {
        "useDefault": true,
        "overrides": []
      },
      "title": "Meet Jan Marshal",
      "visibility": "default",
      "creator": {
        "name": "",
        "email": "jan@alenix.de"
      },
      "htmlLink": "https://www.google.com/calendar/event?eid=ZzU4aHBxMWhsNXM4dWVhcjZpYjVpM2RzazggamFuQGFsZW5peC5kZQ",
      "grantId": "4ee829c0-4f3e-44e5-b64a-791df8d210ea",
      "id": "g58hpq1hl5s8uear6ib5i3dsk8",
      "object": "event",
      "status": "confirmed",
      "when": {
        "startTimezone": "Europe/Berlin",
        "endTimezone": "Europe/Berlin",
        "object": "timespan",
        "startTime": 1727085600,
        "endTime": 1727087400
      },
      "createdAt": 1726763507,
      "updatedAt": 1726763507
    }
  ]
}
*/
