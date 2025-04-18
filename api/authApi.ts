import { registerRequestType } from "@/shared/types/api/authApiType";
import { commonApi } from "./axiosConfig";

export const auth = {
  register: (request: registerRequestType) =>
    commonApi.post("/auth/register", request),
  logout: () => commonApi.post("/auth/logout"),
};
