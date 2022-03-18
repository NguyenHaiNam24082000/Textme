import { useQuery } from "react-query";
import {
  getPendingRequests,
  getOutGoingRequestApi,
  allFriendsRequestApi,
} from "../../apis/friend";

import {
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
  ALL_FRIENDS_KEY,
} from "../../configs/queryKeys";

export const PendingRequests = () => {
  return useQuery(PENDING_REQUESTS_KEY, async () => {
    const { data } = await getPendingRequests();
    return data;
  });
};

export const OutGoingRequests = () => {
  return useQuery(OUT_GOING_REQUESTS_KEY, async () => {
    const { data } = await getOutGoingRequestApi();
    return data;
  });
};

export const AllFriends = () => {
  return useQuery(ALL_FRIENDS_KEY, async () => {
    const { data } = await allFriendsRequestApi();
    return data;
  });
};