"use client";

import { createCalendar } from "@internationalized/date";

import { type CalendarProps, type DateValue } from "react-aria-components";
import { useCalendar } from "react-aria";

import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";

export function Calendar(props: CalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="inline-block text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
      </div>
    </div>
  );
}
