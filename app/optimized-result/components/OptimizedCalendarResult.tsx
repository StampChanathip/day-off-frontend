"use client";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";

export default function OptimizedCalendarResult() {
  const startOfYear = dayjs().startOf("year").toDate();
  const endOfYear = dayjs().endOf("year").toDate();
  const today = dayjs().toDate();

  return (
    <DayPicker
      className="react-day-picker"
      classNames={{
        selected: `bg-primary border-primary text-black`,
        range_start: `bg-primary border-primary text-black rounded-s-lg`,
        range_middle: `bg-primary border-primary text-black `,
        range_end: `bg-primary border-primary text-black rounded-e-lg`,
      }}
      mode={undefined}
      month={startOfYear}
      numberOfMonths={12}
      startMonth={startOfYear}
      endMonth={endOfYear}
      disabled={{ before: today }}
      modifiers={{
        publicHoliday: [new Date()], //TODO: replace data
        weekend: [dayjs("2025-05-24").toDate()], //TODO: replace data
        pto: [dayjs("2025-05-25").toDate()], //TODO: replace data
      }}
      modifiersClassNames={{
        pto: "bg-primary/80 text-black rounded-lg",
        publicHoliday: "bg-neutral/50 text-black rounded-lg",
        weekend: "bg-primary-content/60 text-black rounded-lg",
      }}
      disableNavigation
      hideNavigation
    />
  );
}
