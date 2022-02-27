import { getRequest, patchRequest } from "../axiosQuery";

export const getAllUsers = () => {
  return getRequest(`/api/v1/users`);
};

export const getProfile = (id) => {
  return getRequest(`/api/v1/users/${id}`);
};

export const updateProfile = (id, payload) => {
  return patchRequest(`/api/v1/users/${id}`, payload);
};
