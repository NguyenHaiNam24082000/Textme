import { getRequest, postRequest } from "../axiosQuery";

export const getAllWorkspaces = () => {
  return getRequest(`/api/v1/server/getAll`);
};

export const createWorkspace = (payload) => {
  return postRequest(`/api/v1/server/create`, payload);
};

export const createWorkspaceChannel = (payload) => {
  return postRequest(`/api/v1/server/${payload.severId}/channel`, payload);
};

export const inviteMember = (payload) => {
  return postRequest(`/api/v1/server/${payload.severId}/invite`, payload);
};
