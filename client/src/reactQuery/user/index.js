import { useQuery } from "react-query";
import { getProfile } from "../../apis/account";
import usersOnline from "../../apis/socket/useMeSocket";
import { ACCOUNT_KEY, USERS_ONLINE } from "../../configs/queryKeys";

export const Me = (user) => {
  return useQuery(ACCOUNT_KEY, async () => {
    if (user) return getProfile(user?.id).then((res) => res.data);
    return null;
  });
};

export const GetAllUsersOnline = (user) => {
  return useQuery(USERS_ONLINE, () => {
    return usersOnline;
  });
};
