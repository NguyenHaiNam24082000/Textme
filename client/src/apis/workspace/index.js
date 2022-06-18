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

export const getDiscoverServers = () => {
  return getRequest(`/api/v1/server/discover`);
};

export const sendJoinServerRequest = (payload) => {
  return postRequest(`/api/v1/server/${payload.serverId}/join`);
};

export const cancelJoinServerRequest = (payload) => {
  return postRequest(`/api/v1/server/${payload.serverId}/cancelJoin`);
};

export const getAllInviteMembers = (payload) => {
  return getRequest(`/api/v1/server/${payload.serverId}/allInvite`);
};

export const getAllPendingMembers = (payload) => {
  return getRequest(`/api/v1/server/${payload.serverId}/allPending`);
};

export const getAllBlockedMembers = (payload) => {
  return getRequest(`/api/v1/server/${payload.serverId}/allBlocked`);
};
