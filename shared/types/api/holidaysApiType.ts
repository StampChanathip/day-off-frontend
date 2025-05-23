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
