import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { MainBase } from "../../../components/Main";
// import Channel from "../../../components/Channel";
import ChatArea from "../../../components/Main/ChatArea";
import VideoCall from "../../../components/VideoCall";
import NSFW from "../../../components/Main/NSFW";
import { DMChannelNavbar } from "../../../components/navigations";
import { themeState } from "../../../recoil/themeState";
import { isVisibleComplement } from "../../../store/uiSlice";
import RightSidebar from "../../../components/navigations/RightSidebar";

export default function Server({ channel }) {
  // useMeSocket();
  const [isContinue, setIsContinue] = useState(false);
  const { user } = useSelector((state) => state.user);
  const theme = useRecoilValue(themeState);
  const isVisibleRightSidebar = useSelector(isVisibleComplement);
  const isNSFW = false;
  return (
    <MainBase>
      {!isNSFW ? (
        <>
          {/* <ChannelListSidebar channel={channel} user={user} /> */}
          {/* <DMChannelNavbar channel={channel} user={user} /> */}
          <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
            {channel.type === "TEXT" ? (
              <ChatArea channel={channel} user={user} />
            ) : (
              <VideoCall channel={channel} />
            )}
            {isVisibleRightSidebar && <RightSidebar channel={channel} />}
          </div>
        </>
      ) : (
        //   {/* </div> */}
        <NSFW setIsContinue={setIsContinue} />
      )}
    </MainBase>
  );
}
