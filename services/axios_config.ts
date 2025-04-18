import { envConfig } from "@/configs/configs";
import Axios from "axios";

const baseURL: string = envConfig.API_URL;

export const commonApi = Axios.create({
  baseURL: baseURL,
  timeout: 10 * 1000,
  withCredentials: true,
});

export const authApi = Axios.create({
  baseURL: baseURL,
  timeout: 30 * 1000,
  withCredentials: true,
});
