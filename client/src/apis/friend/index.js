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
