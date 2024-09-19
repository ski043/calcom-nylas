import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { notFound } from "next/navigation";
import React from "react";
import { addDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BookMarked, CalendarX2, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RenderCalendar } from "@/app/components/demo/RenderCalendar";
import { TimeSlots } from "@/app/components/TimeSlots";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/components/SubmitButton";
import { createMeetingAction } from "@/app/actions";

const targetDate = new Date(2024, 8, 19); // Note: month is 0-indexed, so 8 is September
const nextDay = addDays(targetDate, 1);

async function getData(userName: string, meetingName: string) {
  const data = await prisma.user.findUnique({
    where: {
      username: userName,
    },
    select: {
      grantEmail: true,
      name: true,
      grantId: true,
      image: true,
      Availability: true,
      EventType: {
        where: {
          user: {
            username: userName,
          },
          url: meetingName,
        },
      },
    },
  });

  /* const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.grantId as string,
    requestBody: {
      startTime: Math.floor(targetDate.getTime() / 1000),
      endTime: Math.floor(nextDay.getTime() / 1000),
      emails: [data?.grantEmail as string],
    },
  }); */

  if (!data) {
    return notFound();
  }

  return { data };
}

const MeetingPagee = async ({
  params,
  searchParams,
}: {
  params: { username: string; meetingName: string };
  searchParams: { date?: string; time?: string };
}) => {
  const { data } = await getData(params.username, params.meetingName);
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4">
      {showForm ? (
        <Card>
          <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
            <div>
              <Image
                src={data.image as string}
                alt="profile"
                className="size-7 rounded-full"
                width={30}
                height={30}
              />
              <p className="text-sm font-medium text-[#6B7280] mt-1">
                {data.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">Design Workshop</h1>
              <p className="text-sm font-medium text-[#374151]">
                A longer chat to run through design.
              </p>

              <div className="mt-5 grid gap-y-2">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">
                    Friday, 24th June
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">
                    30 Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="size-4 mr-2 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">
                    Google Meet
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />

            <form
              className="flex flex-col gap-y-4"
              action={createMeetingAction}
            >
              <input type="hidden" name="startTime" value={searchParams.date} />
              <input
                type="hidden"
                name="eventName"
                value={params.meetingName}
              />
              <div className="flex flex-col gap-y-1">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input name="email" placeholder="johndoe@gmail.com" />
              </div>

              <SubmitButton text="Book Meeting" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-[1000px] mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
            <div>
              <Image
                src={data.image as string}
                alt="profile"
                className="size-7 rounded-full"
                width={30}
                height={30}
              />
              <p className="text-sm font-medium text-[#6B7280] mt-1">
                {data.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">
                {data.EventType[0].title}
              </h1>
              <p className="text-sm font-medium text-[#374151]">
                {data.EventType[0].description}
              </p>

              <div className="mt-5 grid gap-y-2">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">
                    Friday, 24th June
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">
                    {data.EventType[0].duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="size-4 mr-2 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">
                    Google Meet
                  </span>
                </p>
              </div>
            </div>

            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />

            <div className="my-4 md:my-0">
              <RenderCalendar />
            </div>

            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />

            <TimeSlots selectedDate={selectedDate} userName={params.username} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MeetingPagee;
