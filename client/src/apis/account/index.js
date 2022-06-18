import { getRequest, putRequest } from "../axiosQuery";

export const getAllUsers = () => {
  return getRequest(`/api/v1/users`);
};

export const getProfile = (id) => {
  return getRequest(`/api/v1/users/${id}`);
};

export const updateProfile = (id, payload) => {
  return putRequest(`/api/v1/users/${id}`, payload);
};

export const getUsers = (payload) => {
  return getRequest(`/api/v1/users/get-users?q=${payload}`);
};

export const getMutualIds = (payload) => {
  return getRequest(`/api/v1/users/${payload}/mutual`);
};

export const getAllInviteServers = (payload) => {
  return getRequest(`/api/v1/users/${payload}/invite-servers`);
};
