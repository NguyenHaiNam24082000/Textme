import { useQuery } from "react-query";
import { getProfile } from "../../apis/account";
import { ACCOUNT_KEY } from "../../configs/queryKeys";

export const Me = (user) => {
  return useQuery(ACCOUNT_KEY, async () => {
    if (user) return getProfile(user?.id).then((res) => res.data);
    return null;
  });
};
