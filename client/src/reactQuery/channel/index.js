import { useQuery } from "react-query";
import { getAllDMChannels, getAllGroupChannels } from "../../apis/channel";
import { OPEN_CHANNEL } from "../../configs/queryKeys";

export function GetOpenChannels() {
  return useQuery(OPEN_CHANNEL, async () => {
    let data = [];
    try {
      let dmChannels = await getAllDMChannels().then((res) => res.data);
      let groupChannels = await getAllGroupChannels().then((res) => res.data);
      data = [...dmChannels, ...groupChannels];
    } catch (error) {
      console.log(error);
    }
    return data;
  });
}
