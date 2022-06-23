import { postRequest, putRequest } from "../axiosQuery";

export const register = async (payload) => {
  return await postRequest("/api/v1/auth/register", payload);
};

export const login = async (payload) => {
  return await postRequest("/api/v1/auth/login", payload);
};

export const logout = async (refreshToken) => {
  return await postRequest("/api/v1/auth/logout", { refreshToken });
};

export const forgotPassword = async (payload) => {
  return await postRequest("/api/v1/auth/forgot-password", payload);
};

export const changePassword = async (payload) => {
  return await putRequest("/api/v1/auth/change-password", payload);
};
