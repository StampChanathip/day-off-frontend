import { jwtDecode } from "jwt-decode";

export const getRoleByToken = (token?: string | null): string | null => {
  if (!!token) {
    return jwtDecode<{ role: string }>(token).role || null;
  }

  return null;
};

export const getUserIdByToken = (token: string | null): string | null => {
  if (!!token) {
    return jwtDecode<{ id: string }>(token).id || "";
  }
  return null;
};
