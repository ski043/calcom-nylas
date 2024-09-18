import { createCalendar } from "@internationalized/date";
import { CalendarProps, DateValue, useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { CalendarHeader } from "./CalendarHeader";

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
      {/*    <div className="flex gap-8">
        <CalendarGrid state={state} />
      </div> */}
    </div>
  );
}
