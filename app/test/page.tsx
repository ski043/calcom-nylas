"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import ProfilePic from "@/public/face.jpeg";
import Image from "next/image";
import { BookMarked, CalendarX2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "../components/demo/Calendar";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { Separator } from "@/components/ui/separator";

const BookingPage = () => {
  const router = useRouter();

  const [timeZone, setTimeZone] = useState("America/New_York");
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(date);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      "date",
      date.toDate(timeZone).toISOString().split("T")[0]
    );
    router.push(url.toString());
  };
  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[1000px] mx-auto">
        <CardContent className="p-5 flex flex-col md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
          <div>
            <Image
              src={ProfilePic}
              alt="profile"
              className="size-7 rounded-full"
            />
            <p className="text-sm font-medium text-[#6B7280] mt-1">
              Alex Fisher
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

          <Separator className="my-4 md:hidden" />
          <Separator
            orientation="vertical"
            className="hidden md:block h-full w-[1px]"
          />

          <div className="my-4 md:my-0">
            <Calendar
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              value={date}
              onChange={handleChangeDate}
              onFocusChange={(focused) => setFocusedDate(focused)}
            />
          </div>

          <Separator className="my-4 md:hidden" />
          <Separator
            orientation="vertical"
            className="hidden md:block h-full w-[1px]"
          />

          <div>
            <p className="text-base font-semibold">
              Fri, <span className="text-sm text-[#6B7280]">Sept. 27</span>
            </p>
            <Button variant="outline" className="w-full mt-3">
              10:00
            </Button>
            <Button variant="outline" className="w-full mt-3">
              11:00
            </Button>
            <Button variant="outline" className="w-full mt-3">
              12:00
            </Button>
            <Button variant="outline" className="w-full mt-3">
              13:00
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
