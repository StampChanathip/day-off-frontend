import { DayType } from "@/shared/enums/holiday";

export type BotHolidaysResponse = {
  nameTH: string;
  nameEN: string;
  dateTime: string;
};

export type OptimizeHolidaysRequest = {
  leaveAmount: number;
  startDate: string;
  endDate: string;
};

export type OptimizeHolidaysResponse = {
  resultId: string;
};

export type DayItem = {
  date: string; // ISO date format: "2025-10-03"
  dayType: DayType;
};

export type HolidayPeriod = {
  startDate: string; // ISO date format
  endDate: string; // ISO date format
  totalDaysOff: number;
  leaveDaysUsed: number;
  daysList: DayItem[];
};

export type OptimizedHolidaySummaryResponse = {
  id: string; // UUID
  totalDayOff: number;
  totalLeaveDaysUsed: number;
  totalLeaveDaysLeft: number;
  holidayPeriods: HolidayPeriod[];
};
