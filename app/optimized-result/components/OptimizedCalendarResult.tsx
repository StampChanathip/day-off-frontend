"use client";

import { userHolidayApi } from "@/api/userHolidayApi";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DayType } from "@/shared/enums/holiday";
import { OptimizedHolidaySummaryResponse } from "@/shared/types/api/holidaysApiType";

export default function OptimizedCalendarResult() {
  const [summaryId, setSummaryId] = useState<string | null>(null);
  // const searchParams = useSearchParams();
  // const summaryId = searchParams.get("resultId");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSummaryId(urlParams.get("resultId"));
  }, []);

  const { data: optimizedHolidaySummary } = useQuery({
    queryKey: [`/user-holidays/optimized-summary/${summaryId}`],
    queryFn: async () => {
      const result = await userHolidayApi.getOptimizedSummary(summaryId ?? "");

      return result.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!summaryId,
  });

  const startOfYear = dayjs().startOf("year").toDate();
  const endOfYear = dayjs().endOf("year").toDate();
  const today = dayjs().toDate();

  const getDateRangeFromDayType = (
    holidaySummary: OptimizedHolidaySummaryResponse | undefined,
    dayType: DayType
  ) => {
    return (
      holidaySummary?.holidayPeriods
        .map((period) => period.daysList)
        .flat()
        .filter((day) => day.dayType === dayType)
        .map((day) => dayjs(day.date).toDate()) || []
    );
  };

  const {
    ptoDates,
    weekendDates,
    publicHolidayDates,
    periodStartDates,
    periodEndDates,
  } = useMemo(() => {
    const ptoDates = getDateRangeFromDayType(
      optimizedHolidaySummary,
      DayType.PERSONAL_LEAVE
    );

    const weekendDates = getDateRangeFromDayType(
      optimizedHolidaySummary,
      DayType.WEEKEND
    );

    const publicHolidayDates = getDateRangeFromDayType(
      optimizedHolidaySummary,
      DayType.HOLIDAY
    );

    const periodStartDates =
      optimizedHolidaySummary?.holidayPeriods.map((period) =>
        dayjs(period.startDate).toDate()
      ) || [];

    const periodEndDates =
      optimizedHolidaySummary?.holidayPeriods.map((period) =>
        dayjs(period.endDate).toDate()
      ) || [];

    return {
      ptoDates,
      weekendDates,
      publicHolidayDates,
      periodStartDates,
      periodEndDates,
    };
  }, [optimizedHolidaySummary]);

  const commonSelectedDates =
    "bg-primary/60 border-primary text-black border-white border-y-3 m-8";

  return (
    <DayPicker
      className="react-day-picker"
      mode={undefined}
      month={startOfYear}
      numberOfMonths={12}
      startMonth={startOfYear}
      endMonth={endOfYear}
      disabled={{ before: today }}
      modifiers={{
        publicHolidayDates,
        weekendDates,
        ptoDates,
        periodStartDates,
        periodEndDates,
      }}
      modifiersClassNames={{
        publicHolidayDates: `${commonSelectedDates}`,
        weekendDates: `${commonSelectedDates}`,
        ptoDates: `${commonSelectedDates}`,
        periodStartDates: `${commonSelectedDates} rounded-s-lg border-l-2`,
        periodEndDates: `${commonSelectedDates} rounded-e-lg border-r-2`,
      }}
      disableNavigation
      hideNavigation
    />
  );
}
