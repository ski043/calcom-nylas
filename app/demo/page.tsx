"use client";

import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { Calendar } from "../components/demo/Calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DemoRoute() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const slotParam = searchParams.get("slot");

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
    <Calendar
      minValue={today(getLocalTimeZone())}
      defaultValue={today(getLocalTimeZone())}
      value={date}
      onChange={handleChangeDate}
      onFocusChange={(focused) => setFocusedDate(focused)}
    />
  );
}
