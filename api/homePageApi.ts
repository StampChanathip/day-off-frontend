import { commonApi } from "./axiosConfig";

export const homepage = {
  getBotHolidaysList: () => commonApi.get("/user-holidays/BOT"),
};
