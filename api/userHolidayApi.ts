import {
  OptimizedHolidaySummaryResponse,
  OptimizeHolidaysRequest,
  OptimizeHolidaysResponse,
} from "@/shared/types/api/holidaysApiType";
import { AxiosResponse } from "axios";
import { commonApi } from "./axiosConfig";

export const userHolidayApi = {
  submitOptimizeHolidays: (
    request: OptimizeHolidaysRequest
  ): Promise<AxiosResponse<OptimizeHolidaysResponse>> =>
    commonApi.post("/user-holidays/optimize", request),
  getOptimizedSummary: (
    summaryId: string
  ): Promise<AxiosResponse<OptimizedHolidaySummaryResponse>> =>
    commonApi.get(`/user-holidays/optimized-summary/${summaryId}`),
};
