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

const MeetingsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>
          See upcoming and past events booked through your event type links.
        </CardDescription>
      </CardHeader>
      <CardContent>
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

        <div className="grid grid-cols-3 justify-between items-center">
          <div>
            <p>Wed. 18 Sep</p>
            <p>10:00 AM - 11:00 AM</p>
          </div>
          <p className="text-center">1 Host</p>
          <Button variant="destructive" className="w-fit flex  ml-auto">
            Cancel
          </Button>
        </div>
        <Separator className="my-3" />
      </CardContent>
    </Card>
  );
};

export default MeetingsPage;
