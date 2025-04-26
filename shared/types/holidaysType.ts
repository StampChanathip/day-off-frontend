import { Dayjs } from "dayjs";

export type BotHolidaysResponse = {
  nameTH: string;
  nameEN: string;
  dateTime: string;
};

export type HolidayItemDisplay = {
  name: string;
  dateTime: Dayjs;
};
