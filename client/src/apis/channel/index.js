import { postRequest } from "../axiosQuery";

export const getOrCreateDMChannel = (userId, friendId) => {
  return postRequest("/api/v1/channel/get-or-create");
};
