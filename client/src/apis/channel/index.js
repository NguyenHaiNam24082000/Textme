import { getRequest, postRequest } from "../axiosQuery";

export const getOrCreateDMChannel = (id) => {
  return postRequest("/api/v1/channel/get-or-create", {friendId: id});
};

export const getAllDMChannels = () => {
  return getRequest("/api/v1/channel/get-all-DM-channels");
}

export const getAllGroupChannels = () => {
  return getRequest("/api/v1/channel/get-all-group-channels");
}