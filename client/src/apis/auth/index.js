import { postRequest } from "../axiosQuery";

export const register = async (payload) => {
  return await postRequest("/api/v1/auth/register", payload);
};

export const login = async (payload) => {
  return await postRequest("/api/v1/auth/login", payload);
};

export const logout = async (refreshToken) => {
  return await postRequest("/api/v1/auth/logout", { refreshToken });
};
