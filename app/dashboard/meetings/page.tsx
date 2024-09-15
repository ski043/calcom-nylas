import { cancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
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

import React from "react";

async function getData() {
  const data = await nylas.events.list({
    identifier: "4ee829c0-4f3e-44e5-b64a-791df8d210ea",
    queryParams: {
      calendarId: "jan@alenix.de",
    },
  });

  return data;
}

const MeetingsPage = async () => {
  const data = await getData();

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
                  <Button variant="destructive" className="w-fit flex  ml-auto">
                    Cancel
                  </Button>
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
