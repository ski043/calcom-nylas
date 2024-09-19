import { RenderCalendar } from "@/app/components/demo/RenderCalendar";
import { TimeSlots } from "@/app/components/TimeSlots";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { BookMarked, CalendarX2, Clock } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function getData(username: string, eventName: string) {
  const eventType = await prisma.eventType.findFirst({
    where: {
      url: eventName,
      user: {
        username: username,
      },
      active: true,
    },
    select: {
      description: true,
      title: true,
      duration: true,

      user: {
        select: {
          image: true,
          name: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!eventType) {
    return notFound();
  }

  return eventType;
}

const BookingPage = async ({
  params,
  searchParams,
}: {
  params: { username: string; eventName: string };
  searchParams: { date?: string };
}) => {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const eventType = await getData(params.username, params.eventName);

  const formattedDate = format(selectedDate, "EEEE, do MMMM");

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-[1000px] mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
          <div>
            <Image
              src={eventType.user.image as string}
              alt={`${eventType.user.name}'s profile picture`}
              className="size-9 rounded-full"
              width={30}
              height={30}
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {eventType.user.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{eventType.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {eventType.description}
            </p>
            <div className="mt-5 grid gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {eventType.duration} Mins
                </span>
              </p>
              <p className="flex items-center">
                <BookMarked className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
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
            <RenderCalendar daysofWeek={eventType.user.Availability} />
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-full w-[1px]"
          />

          <TimeSlots selectedDate={selectedDate} userName={params.username} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
