import { getRequest, postRequest, patchRequest } from "../axiosQuery";

export const sendFriendRequest = (payload) => {
  return postRequest("/api/v1/friend/add-friend-request", payload);
};

export const getPendingFriendRequest = () => {
  return getRequest("/api/v1/friend/pending-requests");
};

export const getOutGoingRequestApi = () => {
  return getRequest("/api/v1/friend/outgoing-requests");
};

export const cancelPendingRequestApi = (id) => {
  return patchRequest("/api/v1/friend/cancel-pending-request", { id });
};

export const acceptPendingRequestApi = (id) => {
  return patchRequest("/api/v1/friend/accept-pending-request", { id });
};

export const allFriendsRequestApi = () => {
  return getRequest("/api/v1/friend/all-friends");
};

export const blockFriendRequestApi = (id) => {
  return patchRequest("/api/v1/friend/block-friend", { id });
};

export const unblockFriendRequestApi = (id) => {
  return patchRequest("/api/v1/friend/unblock-friend", { id });
};

export const allBlockedFriendsRequestApi = () => {
  return getRequest("/api/v1/friend/all-blocked-friends");
};

export const addFriendRequestApi = (payload) => {
  return postRequest("/api/v1/friend/add-friend-request", {
    username: payload.username,
    discriminator: payload.discriminator,
  });
};
