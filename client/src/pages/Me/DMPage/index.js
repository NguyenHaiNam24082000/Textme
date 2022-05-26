import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMessageSocket from "../../../apis/socket/useMessageSocket";
import { MainBase } from "../../../components/Main";
import ChatArea from "../../../components/Main/ChatArea";
import NSFW from "../../../components/Main/NSFW";
import { DMChannelNavbar } from "../../../components/navigations";
import RightSidebar from "../../../components/navigations/RightSidebar";
import VideoCall from "../../../components/VideoCall";
import { CHANNEL_MESSAGES_KEY } from "../../../configs/queryKeys";
import { isVisibleComplement } from "../../../store/uiSlice";

export default function DMPage({ channel }) {
  const { user } = useSelector((state) => state.user);
  // const [isGoBack, setIsGoBack] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const isVisibleRightSidebar = useSelector(isVisibleComplement);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setIsNSFW(!isContinue);
  }, [isContinue]);

  useEffect(() => {
    setIsNSFW(channel?.nsfw);
  }, [channel]);

  useMessageSocket(channel?._id, CHANNEL_MESSAGES_KEY(channel?._id));

  return (
    <MainBase>
      {!isNSFW ? (
        <>
          <DMChannelNavbar channel={channel} user={user} />
          <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
            {/* <ChatArea channel={channel} user={user} />
            {isVisibleRightSidebar && <RightSidebar channel={channel} />} */}
            <VideoCall channel={channel} />
          </div>
        </>
      ) : (
        //   {/* </div> */}
        <NSFW setIsContinue={setIsContinue} />
      )}
    </MainBase>
  );
}
