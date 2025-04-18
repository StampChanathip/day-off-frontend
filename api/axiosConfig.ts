import { envConfig } from "@/configs/configs";
import Axios from "axios";

const baseURL: string = envConfig.API_URL;
const basic: string = envConfig.BASIC_API;

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

export const basicApi = Axios.create({
  baseURL: baseURL,
  timeout: 10 * 1000,
  headers: {
    Authorization: "Basic " + basic,
  },
  withCredentials: true,
});
