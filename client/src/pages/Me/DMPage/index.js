import React, { useEffect, useState } from "react";
import { FriendsArea } from "../../../components/Main";
import { MainBase } from "../../../components/Main";
import ChatArea from "../../../components/Main/ChatArea";
import NSFW from "../../../components/Main/NSFW";
import { DMChannelNavbar } from "../../../components/navigations";
import { GetOpenChannels } from "../../../reactQuery/channel";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { CHANNEL_MESSAGES_KEY } from "../../../configs/queryKeys";
import useMessageSocket from "../../../apis/socket/useMessageSocket";
import RightSidebar from "../../../components/navigations/RightSidebar";

export default function DMPage() {
  const { isLoading, data: channels } = GetOpenChannels();
  const { user } = useSelector((state) => state.user);
  const { channel: channelId } = useParams();
  // const [isGoBack, setIsGoBack] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);

  useEffect(() => {
    setIsNSFW(!isContinue);
  }, [isContinue]);

  let channel = null;
  if (channelId && channels?.length) {
    channel = channels.find((c) => c._id === channelId);
  }

  useEffect(() => {
    setIsNSFW(channel?.nsfw);
  }, [channel]);

  useMessageSocket(channel?._id, CHANNEL_MESSAGES_KEY(channel?._id));

  return (
    <MainBase>
      {!isNSFW ? (
        <>
          <DMChannelNavbar channel={channel} user={user}/>
          <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
            <ChatArea channel={channel} user={user} />
            <RightSidebar channel={channel}/>
          </div>
        </>
      ) : (
        //   {/* </div> */}
        <NSFW setIsContinue={setIsContinue} />
      )}
    </MainBase>
  );
}
