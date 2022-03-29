import { getRequest, patchRequest, postRequest } from "../axiosQuery";

export const sendMessage = (payload) => {
  return postRequest("/api/v1/messages/send-message", payload);
};

export const editMessage = (messageId, payload) => {
  return patchRequest(`/api/v1/messages/edit-message/${messageId}`, {
    payload,
  });
};

export const getMessages = (channelId, page, limit = 50) => {
  return getRequest(
    `/api/v1/messages/${channelId}${limit ? `?limit=${limit}` : ""}${
      page ? `&page=${page}` : ""
    }`
  );
};

export const deleteMessage = (messageId) => {
  return patchRequest(`/api/v1/messages/delete-message/${messageId}`);
};
