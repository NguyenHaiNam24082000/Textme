import {
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../axiosQuery";

export const sendMessage = (payload, config) => {
  return postRequest("/api/v1/messages/send-message", payload, config);
};

export const editMessage = (messageId, payload) => {
  return putRequest(`/api/v1/messages/edit-message/${messageId}`, {
    message: payload,
  });
};

export const getMessages = (
  channelId,
  page,
  before,
  after,
  nearBy,
  limit = 25
) => {
  return getRequest(
    `/api/v1/messages/${channelId}${limit ? `?limit=${limit}` : ""}${
      page ? `&page=${page}` : ""
    }${before ? `&before=${before}` : ""}${after ? `&after=${after}` : ""}${
      nearBy ? `&nearBy=${nearBy}` : ""
    }`
  );
};

export const deleteMessage = (messageId) => {
  return deleteRequest(`/api/v1/messages/delete-message/${messageId}`);
};

export const restoreMessage = (messageId) => {
  return patchRequest(`/api/v1/messages/restore-message/${messageId}`);
};

export const translateMessage = (messageId) => {
  return getRequest(`/api/v1/messages/translate/${messageId}`);
};

export const searchMessages = (channelId, options) => {
  return getRequest(
    `/api/v1/messages/${channelId}/search?content=${options.content}&page=${
      options.page || 1
    }&limit=${options.limit}&sort_by=${options.sort_by}&sort_order=${
      options.sort_order
    }`
  );
};
