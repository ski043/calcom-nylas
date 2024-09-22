"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "./Calendar";
import { useState, useEffect } from "react";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";

interface iAppProps {
  daysofWeek: { day: string; isActive: boolean }[];
}

export function RenderCalendar({ daysofWeek }: iAppProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [timeZone, setTimeZone] = useState("America/New_York");
  const [date, setDate] = useState<CalendarDate>(() => {
    const dateParam = searchParams.get("date");
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });
  const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(date);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchParams]);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      "date",
      date.toDate(timeZone).toISOString().split("T")[0]
    );
    router.push(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(timeZone).getDay();
    // Adjust the index to match the daysofWeek array
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !daysofWeek[adjustedIndex].isActive;
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      defaultValue={today(getLocalTimeZone())}
      value={date}
      onChange={handleChangeDate}
      onFocusChange={(focused) => setFocusedDate(focused)}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
