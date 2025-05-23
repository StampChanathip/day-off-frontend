import { OptimizeHolidaysRequest } from "@/shared/types/api/holidaysApiType";
import { commonApi } from "./axiosConfig";

export const homepage = {
  getBotHolidaysList: () => commonApi.get("/user-holidays/BOT"),
  submitOptimizeHolidays: (request: OptimizeHolidaysRequest) =>
    commonApi.post("/user-holidays/optimize", request),
};
