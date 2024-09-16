"use client";

import { Calendar } from "@/app/components/dashboard/calendar";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { DateValue, useLocale } from "react-aria-components";
import {
  type CalendarDate,
  getLocalTimeZone,
  getWeeksInMonth,
  today,
} from "@internationalized/date";

const MeetingPage = () => {
  const router = useRouter();
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const slotParam = searchParams.get("slot");

  const [timeZone, setTimeZone] = React.useState("America/New_York");
  const [date, setDate] = React.useState(today(getLocalTimeZone()));
  const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
    date
  );

  const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      "date",
      date.toDate(timeZone).toISOString().split("T")[0]
    );
    router.push(url.toString());
  };

  const handleChangeAvailableTime = (time: string) => {
    const timeValue = time.split(":").join(" ");

    const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
    if (!match) {
      console.error("Invalid time format");
      return null;
    }

    let hours = Number.parseInt(match[1]);
    const minutes = Number.parseInt(match[2]);
    const isPM = match[3] && match[3].toLowerCase() === "pm";

    if (isPM && (hours < 1 || hours > 12)) {
      console.error("Time out of range (1-12) in 12-hour format");
      return null;
    }

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const currentDate = date.toDate(timeZone);
    currentDate.setHours(hours, minutes);

    const url = new URL(window.location.href);
    url.searchParams.set("slot", currentDate.toISOString());
    router.push(url.toString());
  };

  const showForm = !!dateParam && !!slotParam;
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      defaultValue={today(getLocalTimeZone())}
      value={date}
      onChange={handleChangeDate}
      onFocusChange={(focused) => setFocusedDate(focused)}
    />
    /*  <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[850px] w-full">
        <CardContent className="p-6 grid grid-cols-7">
          <div className="col-span-2">
            <p>john fisher</p>
          </div>
          <div className="col-span-3 flex  justify-center">
            <Calendar
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              value={date}
              onChange={handleChangeDate}
              onFocusChange={(focused) => setFocusedDate(focused)}
            />
          </div>

          <div className="col-span-2 grid gap-y-5">
            <Button className="w-full" variant="secondary">
              09:00
            </Button>
            <Button className="w-full" variant="secondary">
              09:00
            </Button>
            <Button className="w-full" variant="secondary">
              09:00
            </Button>
            <Button className="w-full" variant="secondary">
              09:00
            </Button>
            <Button className="w-full" variant="secondary">
              09:00
            </Button>
          </div>
        </CardContent>
      </Card>
    </div> */
  );
};

export default MeetingPage;
