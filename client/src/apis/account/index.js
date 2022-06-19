import { getRequest, putRequest } from "../axiosQuery";

export const getAllUsers = () => {
  return getRequest(`/api/v1/users`);
};

export const getProfile = (id) => {
  return getRequest(`/api/v1/users/${id}/me`);
};

export const updateProfile = (id, payload) => {
  return putRequest(`/api/v1/users/${id}/me`, payload);
};

export const getUsers = (payload) => {
  return getRequest(`/api/v1/users/get-users?q=${payload}`);
};

export const getMutualIds = (payload) => {
  return getRequest(`/api/v1/users/${payload}/mutual`);
};

export const getAllInviteServers = () => {
  return getRequest(`/api/v1/users/invites`);
};
