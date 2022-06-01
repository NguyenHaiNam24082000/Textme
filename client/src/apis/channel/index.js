import { getRequest, postRequest, putRequest } from "../axiosQuery";

export const getOrCreateDMChannel = (id) => {
  return postRequest("/api/v1/channel/get-or-create", { friendId: id });
};

export const getAllDMChannels = () => {
  return getRequest("/api/v1/channel/get-all-DM-channels");
};

export const getAllGroupChannels = () => {
  return getRequest("/api/v1/channel/get-all-group-channels");
};

export const createGroupChannel = (data) => {
  return postRequest("/api/v1/channel/create-group-channel", data);
};

export const getPinnedMessage = (channelId) => {
  return getRequest(`/api/v1/channel/${channelId}/pins`);
};

export const pinnedMessage = (channelId, messageId) => {
  return putRequest(`/api/v1/channel/${channelId}/pins/${messageId}`);
};

export const inviteFriendsToChannel = (channelId, data) => {
  return postRequest(`/api/v1/channel/${channelId}/invite`, data);
};

export const getAttachments = (channelId) => {
  return getRequest(`/api/v1/channel/${channelId}/attachments`);
};

export const getLinks = (channelId) => {
  return getRequest(`/api/v1/channel/${channelId}/links`);
};
